import { forwardRef, Inject, NotFoundException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import jsonwebtoken from 'jsonwebtoken';

import { CookieResponse } from '../../interfaces/cookie-types';
import { LoginUserInfo } from '../../interfaces/login-user-info';
import {
  AccessPayload,
  BasePayload,
  GeneratedTokens,
  TokenPayload,
  Tokens,
} from '../../interfaces/token-types';
import { constants } from '../../utils';
import { UserEntity } from '../database/entities/user.entity';
import { RefreshTokenService } from '../refresh-token/refresh-token.service';
import { InvitationRepository } from '../repository/invitation.repository';
import { RefreshTokenRepository } from '../repository/refresh-token.repository';
import { UserRepository } from '../repository/user.repository';
import { LoginUserDto } from '../users/dto/login-user.dto';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import { TokenService } from './token/token.service';
import { TokenCookieService } from './token/token-cookie.service';

export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
    private readonly refreshTokenService: RefreshTokenService,
    private readonly invitationRepository: InvitationRepository,
    private readonly userRepository: UserRepository,
    private readonly tokenService: TokenService,
    private readonly refreshTokenRepository: RefreshTokenRepository,
    private readonly tokenCookieService: TokenCookieService,
  ) {}

  public async login(
    { email, password, keepMeLoggedIn }: LoginUserDto,
    res: CookieResponse,
  ): Promise<LoginUserInfo> {
    const user = await this.validateUser(email, password);

    const [refreshToken, expirationDate] = await this.tokenService.generateToken(
      'REFRESH',
      user,
      keepMeLoggedIn,
    );

    const [accessToken] = await this.tokenService.generateToken('ACCESS', user, keepMeLoggedIn);

    let logoutToken: string | undefined;

    if (!keepMeLoggedIn) {
      [logoutToken] = await this.tokenService.generateToken('LOGOUT', user, keepMeLoggedIn);
    }

    const generateTokens: GeneratedTokens = {
      tokens: {
        logoutToken,
        accessToken,
        refreshToken,
      },
      expiration: expirationDate,
    };

    this.tokenCookieService.setCookieTokens(generateTokens, res);

    const { firstName, lastName, roles } = user;

    return {
      user: {
        email,
        firstName,
        lastName,
        roles,
      },
      expirationDate: expirationDate.getTime(),
    };
  }

  public generateAccessTokens(user: UserEntity, keepMeLoggedIn: boolean): string {
    const { sign } = jsonwebtoken;

    const { ACCESS_SECRET } = process.env;
    if (!ACCESS_SECRET) {
      throw new Error('Secrets not set');
    }
    const { id, roles } = user;
    const {
      tokenConfig: { accessToken },
    } = constants;
    const payload: AccessPayload = { sub: id, type: accessToken.name, roles, keepMeLoggedIn };

    return sign(payload, ACCESS_SECRET, {
      expiresIn: accessToken.expiresIn,
    });
  }

  private static validatePayload(payload: BasePayload, userId: string, type: string) {
    const { sub, type: payloadType } = payload;
    if (sub !== userId) {
      throw Error('Invalid subscriber ID');
    }
    if (payloadType !== type) {
      throw Error('Invalid payload type');
    }
  }

  public validateTokens(
    tokens: Tokens,
    accessTokenOptions?: jsonwebtoken.VerifyOptions,
  ): TokenPayload {
    const { accessToken, logoutToken } = tokens;
    const {
      tokenConfig: {
        accessToken: { name: accessTokenName },
        logoutToken: { name: logoutTokenName },
      },
    } = constants;
    const { verify } = jsonwebtoken;
    const { ACCESS_SECRET, LOGOUT_SECRET } = process.env;
    if (!ACCESS_SECRET || !LOGOUT_SECRET) {
      throw new Error('Secrets not set');
    }
    try {
      const accessPayload = verify(accessToken, ACCESS_SECRET, accessTokenOptions) as TokenPayload;
      AuthService.validatePayload(accessPayload, accessPayload.sub, accessTokenName);
      if (!accessPayload.keepMeLoggedIn) {
        if (!logoutToken) {
          throw new Error('Missing logout token');
        }
        const logoutPayload = verify(logoutToken, LOGOUT_SECRET) as TokenPayload;
        AuthService.validatePayload(logoutPayload, accessPayload.sub, logoutTokenName);
      }
      return accessPayload;
    } catch (err) {
      throw new UnauthorizedException('Invalid tokens');
    }
  }

  public async refreshAccessTokens(tokens: Tokens): Promise<[string, Date]> {
    const { logoutToken, refreshToken, accessToken } = tokens;
    const {
      tokenConfig: {
        accessToken: { name: accessTokenName },
        logoutToken: { name: logoutTokenName },
      },
    } = constants;
    const { verify } = jsonwebtoken;
    const { ACCESS_SECRET, LOGOUT_SECRET } = process.env;
    if (!ACCESS_SECRET || !LOGOUT_SECRET) {
      throw new Error('Secrets not set');
    }
    try {
      const accessPayload = verify(accessToken, ACCESS_SECRET, {
        ignoreExpiration: true,
      }) as AccessPayload;
      AuthService.validatePayload(accessPayload, accessPayload.sub, accessTokenName);

      if (!refreshToken) {
        throw new Error('Missing refresh token');
      }
      const { keepMeLoggedIn, user, expirationDate } = await this.refreshTokenService.find(
        refreshToken,
        accessPayload.sub,
      );
      const userEntity = await user;
      if (!keepMeLoggedIn) {
        if (!logoutToken) {
          throw new Error('Missing logout token');
        }
        const logoutPayload = verify(logoutToken, LOGOUT_SECRET) as TokenPayload;
        AuthService.validatePayload(logoutPayload, userEntity.id, logoutTokenName);
      }

      const newAccessToken = await this.generateAccessTokens(userEntity, keepMeLoggedIn);

      return [newAccessToken, expirationDate];
    } catch (err) {
      throw new UnauthorizedException('Invalid tokens');
    }
  }

  public async getUser(userId: string): Promise<UserEntity> {
    return this.userRepository.findByIdOrFail(userId);
  }

  public async logout(refreshToken: string, userId: string) {
    await this.refreshTokenRepository.repository.delete({ id: refreshToken, userId });
  }

  async logoutFromAllDevices(accessToken: string) {
    const { userId } = await this.refreshTokenRepository.findByIdOrFail(accessToken);

    await this.refreshTokenRepository.deleteAllWithUserId(userId);
  }

  async register(registerDto: RegisterDto): Promise<UserEntity> {
    const { password, firstName, lastName, email, code } = registerDto;

    const { roles, expirationDate } = await this.invitationRepository.findWithCredentialsOrFail(
      email,
      code,
    );

    if (expirationDate.getTime() < Date.now()) {
      throw new Error('Invitation expired');
    }

    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);

    const newUser = await this.userRepository.create({
      password: hash,
      firstName,
      lastName,
      email,
      roles,
    });

    await this.invitationRepository.deleteById(code);

    return newUser;
  }

  async validateUser(email: string, password: string): Promise<UserEntity> {
    const user = await this.usersService.findOneByEmail(email);
    const { password: passwordHash } = user;
    const isMatch = await bcrypt.compare(password, passwordHash);
    if (!isMatch) {
      throw new NotFoundException('User password mismatch');
    }
    return user;
  }
}

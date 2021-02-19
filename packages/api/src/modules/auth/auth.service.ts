import { forwardRef, Inject, NotFoundException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import jsonwebtoken from 'jsonwebtoken';
import ms from 'ms';

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
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';

export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
    private readonly refreshTokenService: RefreshTokenService,
  ) {}

  public async login(user: UserEntity, keepMeLoggedIn: boolean): Promise<GeneratedTokens> {
    const {
      tokenConfig: { refreshToken, logoutToken },
    } = constants;
    const { sign } = jsonwebtoken;
    const { LOGOUT_SECRET } = process.env;
    if (!LOGOUT_SECRET) {
      throw new Error('Secrets not set');
    }

    const refreshExpiresIn = keepMeLoggedIn
      ? refreshToken.keepMeLoggedIn.expiresIn
      : refreshToken.withOutKeepMeLoggedIn.expiresIn;
    const refreshExpiration = new Date(ms(refreshExpiresIn));

    const newRefreshToken = await this.refreshTokenService.create(
      user,
      keepMeLoggedIn,
      refreshExpiration,
    );
    const newAccessToken = this.generateAccessTokens(user, keepMeLoggedIn);

    const tokens: Tokens = {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    };

    if (!keepMeLoggedIn) {
      const logoutPayload: BasePayload = { sub: user.id, type: logoutToken.name };
      tokens.logoutToken = sign(logoutPayload, LOGOUT_SECRET, {
        expiresIn: logoutToken.expiresIn,
      });
    }

    return {
      tokens,
      expiration: refreshExpiration,
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

      if (!keepMeLoggedIn) {
        if (!logoutToken) {
          throw new Error('Missing logout token');
        }
        const logoutPayload = verify(logoutToken, LOGOUT_SECRET) as TokenPayload;
        AuthService.validatePayload(logoutPayload, user.id, logoutTokenName);
      }

      const newAccessToken = await this.generateAccessTokens(user, keepMeLoggedIn);

      return [newAccessToken, expirationDate];
    } catch (err) {
      throw new UnauthorizedException('Invalid tokens');
    }
  }

  public async getUser(): Promise<Promise<UserEntity> | undefined> {
    return undefined;
  }

  public async logout(refreshToken: string, userId: string) {
    await this.refreshTokenService.delete(refreshToken, userId);
  }

  async register(user: CreateUserDto): Promise<UserEntity> {
    const { password, ...rest } = user;

    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);

    const newUser: CreateUserDto = { password: hash, ...rest };
    return this.usersService.create(newUser);
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

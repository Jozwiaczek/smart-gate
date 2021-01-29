import { forwardRef, Inject, NotFoundException, UnauthorizedException } from '@nestjs/common';
import jsonwebtoken from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { UserEntity } from '../database/entities/user.entity';
import { UsersService } from '../users/users.service';
import { TokenConfig } from '../utils/constants';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { GeneratedTokens, Payload, TokenPayload, Tokens } from '../interfaces/token-types';
import { RefreshTokenService } from './refresh-token.service';

export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
    private readonly refreshTokenService: RefreshTokenService,
  ) {}

  private static generateTokens(user: UserEntity, keepMeLogin: boolean): GeneratedTokens {
    const payload: TokenPayload = { sub: user.id, roles: user.roles, keepMeLogin };
    const { sign } = jsonwebtoken;
    let tokens: Tokens;
    if (keepMeLogin) {
      tokens = {
        accessToken: sign(payload, 'secret', {
          expiresIn: TokenConfig.accessToken.expiresIn,
        }),
        logoutToken: '',
        refreshToken: sign(payload, 'secret', {
          expiresIn: TokenConfig.refreshToken.keepMeLogin.expiresIn,
        }),
      };
    } else {
      tokens = {
        accessToken: sign(payload, 'secret', {
          expiresIn: TokenConfig.accessToken.expiresIn,
        }),
        logoutToken: sign(payload, 'secret', {
          expiresIn: TokenConfig.logoutToken.expiresIn,
        }),
        refreshToken: sign(payload, 'secret', {
          expiresIn: TokenConfig.refreshToken.withOutKeepMeLogin.expiresIn,
        }),
      };
    }

    const { exp: accessExp } = jsonwebtoken.decode(tokens.accessToken) as Payload;
    const { exp: refreshExp } = jsonwebtoken.decode(tokens.refreshToken) as Payload;

    return {
      tokens,
      accessExpiration: new Date(accessExp * 1000),
      refreshExpiration: new Date(refreshExp * 1000),
    };
  }

  public async login(user: UserEntity, keepMeLogin: boolean): Promise<GeneratedTokens> {
    const genTokens = AuthService.generateTokens(user, keepMeLogin);
    const {
      tokens: { refreshToken },
      refreshExpiration,
    } = genTokens;

    await this.refreshTokenService.create(refreshToken, user, refreshExpiration);

    return genTokens;
  }

  public validateTokens(tokens: Tokens): TokenPayload {
    const { accessToken, logoutToken } = tokens;
    const { verify } = jsonwebtoken;
    try {
      const accessPayload = verify(accessToken, 'secret') as TokenPayload;
      if (!accessPayload.keepMeLogin) {
        const logoutPayload = verify(logoutToken, 'secret') as TokenPayload;
        if (accessPayload.sub !== logoutPayload.sub) {
          throw new Error('Invalid subscriber ID');
        }
      }
      return accessPayload;
    } catch (err) {
      throw new UnauthorizedException('Invalid tokens');
    }
  }

  public async refreshTokens(tokens: Tokens): Promise<GeneratedTokens> {
    const { logoutToken, refreshToken } = tokens;
    const { verify } = jsonwebtoken;
    try {
      const refreshPayload = verify(refreshToken, 'secret') as TokenPayload;
      if (!refreshPayload.keepMeLogin) {
        const logoutPayload = verify(logoutToken, 'secret') as TokenPayload;
        if (logoutPayload.sub !== refreshPayload.sub) {
          throw new Error('Invalid subscriber ID');
        }
      }
      const user = await this.usersService.findOne(refreshPayload.sub);
      const valid = !!(await this.refreshTokenService.find(refreshToken, user));
      let newTokens: GeneratedTokens;
      if (valid) {
        newTokens = AuthService.generateTokens(user, refreshPayload.keepMeLogin);
      } else {
        throw new Error('Invalid refresh token');
      }
      return newTokens;
    } catch (err) {
      throw new UnauthorizedException('Invalid tokens');
    }
  }

  public async getUser(): Promise<Promise<UserEntity> | undefined> {
    return undefined;
  }

  public async logout(refreshToken: string, userId: string) {
    const user = await this.usersService.findOne(userId);
    await this.refreshTokenService.delete(refreshToken, user);
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

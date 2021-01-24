import { forwardRef, Inject, UnauthorizedException } from '@nestjs/common';
import jsonwebtoken from 'jsonwebtoken';
import { UserEntity } from '../database/entities/user.entity';
import { UserService } from '../user/user.service';
import { TokenConfig } from '../utils/constants';

export interface Tokens {
  accessToken: string;
  refreshToken: string;
  logoutToken: string;
}
export interface TokenPayload {
  sub: string;
  roles: Array<string>;
  keepMeLogin: boolean;
}

export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
  ) {}

  public generateTokens(user: UserEntity, keepMeLogin: boolean): Tokens {
    const payload: TokenPayload = { sub: user.id, roles: user.roles, keepMeLogin };
    const tokens: Tokens = {
      accessToken: jsonwebtoken.sign(payload, 'secret', {
        expiresIn: TokenConfig.accessToken.expiresIn,
      }),
      logoutToken: keepMeLogin
        ? ''
        : jsonwebtoken.sign(payload, 'secret', {
            expiresIn: TokenConfig.logoutToken.expiresIn,
          }),
      refreshToken: jsonwebtoken.sign(payload, 'secret', {
        expiresIn: keepMeLogin
          ? TokenConfig.refreshToken.keepMe.expiresIn
          : TokenConfig.refreshToken.withOutKeepMe.expiresIn,
      }),
    };

    // todo store refresh token in db

    return tokens;
  }

  public validateTokens(tokens: Tokens): TokenPayload {
    const { accessToken, logoutToken } = tokens;
    try {
      const accessPayload = jsonwebtoken.verify(accessToken, 'secret') as TokenPayload;
      if (!accessPayload.keepMeLogin) {
        const logoutPayload = jsonwebtoken.verify(logoutToken, 'secret') as TokenPayload;
        if (accessPayload.sub !== logoutPayload.sub) {
          throw new Error('Invalid subscriber ID');
        }
      }
      return accessPayload;
    } catch (err) {
      throw new UnauthorizedException('Invalid tokens');
    }
  }

  public async refreshTokens(tokens: Tokens): Promise<Tokens> {
    const { logoutToken, refreshToken } = tokens;
    try {
      const refreshPayload = jsonwebtoken.verify(refreshToken, 'secret') as TokenPayload;
      if (!refreshPayload.keepMeLogin) {
        const logoutPayload = jsonwebtoken.verify(logoutToken, 'secret') as TokenPayload;
        if (logoutPayload.sub !== refreshPayload.sub) {
          throw new Error('Invalid subscriber ID');
        }
      }

      // TODO check refresh token in db
      let newTokens: Tokens;
      const user = await this.userService.findById(refreshPayload.sub);
      if (user) {
        newTokens = this.generateTokens(user, refreshPayload.keepMeLogin);
        // TODO save refresh token in db
      } else {
        throw new Error('Invalid subscriber ID');
      }
      return newTokens;
    } catch (err) {
      throw new UnauthorizedException('Invalid tokens');
    }
  }

  public async getUser(): Promise<Promise<UserEntity> | undefined> {
    return undefined;
  }

  public async logout(refreshToken: string) {
    // TODO remove token
  }

  async login(user: UserEntity) {
    return null;
  }

  async register(user: UserEntity) {
    return null;
  }

  async validateUser(email: string, password: string): Promise<UserEntity | undefined> {
    return this.userService.getUserByCred(email, password);
  }
}

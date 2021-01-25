import { forwardRef, Inject, NotFoundException, UnauthorizedException } from '@nestjs/common';
import jsonwebtoken from 'jsonwebtoken';
import { UserEntity } from '../database/entities/user.entity';
import { UsersService } from '../users/users.service';
import { TokenConfig } from '../utils/constants';
import { CreateUserDto } from '../users/dto/create-user.dto';

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
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
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
      const user = await this.usersService.findOne(refreshPayload.sub);
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

  async register(user: CreateUserDto): Promise<UserEntity> {
    return this.usersService.create(user);
  }

  async validateUser(email: string, passwordHash: string): Promise<UserEntity> {
    const user = await this.usersService.findOneByEmail(email);
    if (user.password !== passwordHash) throw new NotFoundException('User password mismatch');
    return user;
  }
}

import { forwardRef, Inject, NotFoundException, UnauthorizedException } from '@nestjs/common';
import jsonwebtoken from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { UserEntity } from '../database/entities/user.entity';
import { UsersService } from '../users/users.service';
import { TokenConfig } from '../utils/constants';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { TokenPayload, Tokens } from '../interfaces/token-types';

export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
  ) {}

  public generateTokens(user: UserEntity, keepMeLogin: boolean): Tokens {
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

    // todo store refresh token in db

    return tokens;
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

  public async refreshTokens(tokens: Tokens): Promise<Tokens> {
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

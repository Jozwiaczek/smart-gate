import { Injectable, NotFoundException } from '@nestjs/common';
import * as Sentry from '@sentry/node';
import * as bcrypt from 'bcrypt';

import { InvitationStatus } from '../../enums/invitationStatus.enum';
import { CookieResponse } from '../../interfaces/cookie-types';
import { GeneratedTokens } from '../../interfaces/token-types';
import { UserEntity } from '../database/entities/user.entity';
import { InvitationRepository } from '../repository/invitation.repository';
import { RefreshTokenRepository } from '../repository/refresh-token.repository';
import { UserRepository } from '../repository/user.repository';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { UserInfo } from './interfaces/user-info.types';
import { TokenService } from './token/token.service';
import { TokenCookieService } from './token/token-cookie.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly invitationRepository: InvitationRepository,
    private readonly userRepository: UserRepository,
    private readonly tokenService: TokenService,
    private readonly refreshTokenRepository: RefreshTokenRepository,
    private readonly tokenCookieService: TokenCookieService,
  ) {}

  public async login(
    { email, password, keepMeLoggedIn }: LoginDto,
    res: CookieResponse,
  ): Promise<UserInfo> {
    const user = await this.validateUser(email, password);

    try {
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

      const { firstName, lastName, roles, id, createdAt, updatedAt } = user;

      return {
        user: {
          id,
          createdAt,
          updatedAt,
          email,
          firstName,
          lastName,
          roles,
        },
        expirationDate: expirationDate.getTime(),
      };
    } catch (e) {
      Sentry.captureException(e);
      throw e;
    }
  }

  public async getUser(userId: string): Promise<UserEntity> {
    return this.userRepository.findByIdOrFail(userId);
  }

  public async logout(response: CookieResponse, userId: string): Promise<void> {
    const refreshToken = this.tokenCookieService.getCookieToken('REFRESH');
    this.tokenCookieService.clearAllCookieTokens(response);

    try {
      await this.refreshTokenRepository.repository.delete({ id: refreshToken, userId });
    } catch (e) {
      Sentry.captureException(e);
    }
  }

  public async logoutFromAllDevices(response: CookieResponse, userId: string) {
    const refreshToken = this.tokenCookieService.getCookieToken('REFRESH');
    this.tokenCookieService.clearAllCookieTokens(response);

    try {
      await this.refreshTokenRepository.findOneWithUserIdOrFail(refreshToken, userId);

      await this.refreshTokenRepository.deleteAllWithUserId(userId);
    } catch (e) {
      Sentry.captureException(e);
    }
  }

  public async register(registerDto: RegisterDto): Promise<UserEntity> {
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

    const newUserPromise = this.userRepository.create({
      password: hash,
      firstName,
      lastName,
      email,
      roles,
    });

    const newUser = await newUserPromise;

    await this.invitationRepository.update(code, {
      status: InvitationStatus.Accepted,
    });

    return newUser;
  }

  private async validateUser(email: string, password: string): Promise<UserEntity> {
    const user = await this.userRepository.findOneByEmailOrFail(email);
    const { password: passwordHash } = user;
    const isMatch = await bcrypt.compare(password, passwordHash);
    if (!isMatch) {
      throw new NotFoundException('User password mismatch');
    }
    return user;
  }
}

import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UnauthorizedException,
} from '@nestjs/common';

import { CookieRequest, CookieResponse } from '../../interfaces/cookie-types';
import { BasePayload, TokenPayload } from '../../interfaces/token-types';
import { ValidationPipe } from '../../utils/validation.pipe';
import { SentryIgnoreException } from '../sentry/decorators/sentry-ignore-exception.decorator';
import { UseSentryTransaction } from '../sentry/decorators/use-sentry-transaction.decorator';
import { AuthService } from './auth.service';
import { Auth } from './decorators/auth.decorator';
import { CookiePayload } from './decorators/cookiePayload.decorator';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { UserInfo } from './interfaces/user-info.types';

@UseSentryTransaction()
@SentryIgnoreException()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(
    @Body(new ValidationPipe()) loginUser: LoginDto,
    @Res({ passthrough: true }) response: CookieResponse,
  ): Promise<UserInfo> {
    return this.authService.login(loginUser, response).catch(() => {
      throw new UnauthorizedException('Invalid credentials');
    });
  }

  @Post('register')
  async register(
    @Body(new ValidationPipe()) registerDto: RegisterDto,
    @Res({ passthrough: true }) response: CookieResponse,
  ): Promise<UserInfo> {
    const newUser = await this.authService.register(registerDto).catch(() => {
      throw new BadRequestException('User already exists');
    });

    const loginUser: LoginDto = {
      email: newUser.email,
      keepMeLoggedIn: false,
      password: registerDto.password,
    };

    return this.authService.login(loginUser, response);
  }

  @Auth()
  @Get('me')
  async me(@CookiePayload() { sub, exp }: TokenPayload): Promise<UserInfo> {
    const { email, firstName, lastName, roles, id, createdAt, updatedAt } =
      await this.authService.getUser(sub);
    return {
      user: {
        id,
        email,
        firstName,
        lastName,
        roles,
        createdAt,
        updatedAt,
      },
      expirationDate: exp * 1000,
    };
  }

  @Auth()
  @Get('logout')
  async logout(
    @Req() request: CookieRequest,
    @Res({ passthrough: true }) response: CookieResponse,
    @CookiePayload() payload: BasePayload,
  ): Promise<void> {
    await this.authService.logout(response, payload.sub);
  }

  @Auth()
  @Get('logoutFromAllDevices')
  async logoutFromAllDevices(
    @Req() request: CookieRequest,
    @Res({ passthrough: true }) response: CookieResponse,
    @CookiePayload() payload: BasePayload,
  ): Promise<void> {
    await this.authService.logoutFromAllDevices(response, payload.sub);
  }
}

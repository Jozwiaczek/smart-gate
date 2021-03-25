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
import { LoginUserInfo } from '../../interfaces/login-user-info';
import { BasePayload, TokenPayload } from '../../interfaces/token-types';
import { ValidationPipe } from '../../utils/validation.pipe';
import { LoginUserDto } from '../users/dto/login-user.dto';
import { AuthService } from './auth.service';
import { Auth } from './decorators/auth.decorator';
import { CookiePayload } from './decorators/cookiePayload.decorator';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(
    @Body(new ValidationPipe()) loginUser: LoginUserDto,
    @Res({ passthrough: true }) response: CookieResponse,
  ) {
    return this.authService.login(loginUser, response).catch(() => {
      throw new UnauthorizedException('Invalid credentials');
    });
  }

  @Post('register')
  async register(
    @Body(new ValidationPipe()) registerDto: RegisterDto,
    @Res({ passthrough: true }) response: CookieResponse,
  ) {
    const newUser = await this.authService.register(registerDto).catch(() => {
      throw new BadRequestException('User already exists');
    });

    const loginUser: LoginUserDto = {
      email: newUser.email,
      keepMeLoggedIn: false,
      password: registerDto.password,
    };

    return this.authService.login(loginUser, response);
  }

  @Auth()
  @Get('me')
  async me(@CookiePayload() { sub, exp }: TokenPayload) {
    const { email, firstName, lastName, roles } = await this.authService.getUser(sub);
    const loginUserInfo: LoginUserInfo = {
      user: {
        email,
        firstName,
        lastName,
        roles,
      },
      expirationDate: exp * 1000,
    };
    return loginUserInfo;
  }

  @Auth()
  @Get('logout')
  async logout(
    @Req() request: CookieRequest,
    @Res({ passthrough: true }) response: CookieResponse,
    @CookiePayload() payload: BasePayload,
  ) {
    await this.authService.logout(response, payload.sub);
  }

  @Get('logoutFromAllDevices')
  async logoutFromAllDevices(
    @Req() request: CookieRequest,
    @Res({ passthrough: true }) response: CookieResponse,
    @CookiePayload() payload: BasePayload,
  ) {
    await this.authService.logoutFromAllDevices(response, payload.sub);
  }
}

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
import { constants, cookiesUtils } from '../../utils';
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
    return await this.authService.login(loginUser, response).catch((e) => {
      console.log(e);
      throw new UnauthorizedException('Invalid credentials');
    });
  }

  @Post('register')
  async register(
    @Body(new ValidationPipe()) registerDto: RegisterDto,
    @Res({ passthrough: true }) response: CookieResponse,
  ) {
    const newUser = await this.authService.register(registerDto).catch((e) => {
      console.log(e);
      throw new BadRequestException('User already exists');
    });

    const loginUser: LoginUserDto = {
      email: newUser.email,
      keepMeLoggedIn: false,
      password: registerDto.password,
    };

    return await this.authService.login(loginUser, response);
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
    const { tokenConfig } = constants;
    const { getCookies, clearCookies } = cookiesUtils;

    const cookies = getCookies(request);

    const refreshToken = cookies[tokenConfig.refreshToken.name];

    try {
      await this.authService.logout(refreshToken, payload.sub);
    } finally {
      clearCookies(response);
    }
  }

  @Get('logoutFromAllDevices')
  async logoutFromAllDevices(
    @Req() request: CookieRequest,
    @Res({ passthrough: true }) response: CookieResponse,
  ) {
    const { tokenConfig } = constants;
    const { getCookies, clearCookies } = cookiesUtils;

    const cookies = getCookies(request);

    const accessToken = cookies[tokenConfig.accessToken.name];

    try {
      await this.authService.logoutFromAllDevices(accessToken);
    } finally {
      clearCookies(response);
    }
  }
}

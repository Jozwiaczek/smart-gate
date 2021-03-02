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
import { constants, cookiesUtils } from '../../utils';
import { ValidationPipe } from '../../utils/validation.pipe';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginUserDto } from '../users/dto/login-user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(
    @Body(new ValidationPipe()) loginUser: LoginUserDto,
    @Res({ passthrough: true }) response: CookieResponse,
  ) {
    const [genTokens, user] = await this.authService.login(loginUser).catch(() => {
      throw new UnauthorizedException('Invalid credentials');
    });

    const { setCookies } = cookiesUtils;
    setCookies(genTokens, response);
    // TODO: add separate method for extracting user
    // eslint-disable-next-line no-unused-vars
    const { password, ...rest } = user;
    return rest;
  }

  @Post('register')
  async register(
    @Body(new ValidationPipe()) user: CreateUserDto,
    @Res({ passthrough: true }) response: CookieResponse,
  ) {
    const newUser = await this.authService.register(user).catch(() => {
      throw new BadRequestException('User already exists');
    });

    const loginUser: LoginUserDto = {
      email: newUser.email,
      keepMeLoggedIn: false,
      password: '',
    };

    const [genTokens] = await this.authService.login(loginUser);
    console.log(genTokens);
    const { setCookies } = cookiesUtils;
    setCookies(genTokens, response);
    // TODO: add separate method for extracting user
    // eslint-disable-next-line no-unused-vars
    const { password, ...rest } = user;
    return rest;
  }

  @Get('logout')
  async logout(
    @Req() request: CookieRequest,
    @Res({ passthrough: true }) response: CookieResponse,
  ) {
    const { tokenConfig } = constants;
    const { getCookies, clearCookies } = cookiesUtils;

    clearCookies(response);

    const cookies = getCookies(request);

    const refreshToken = cookies[tokenConfig.refreshToken.name];
    const accessToken = cookies[tokenConfig.accessToken.name];

    await this.authService.logout(refreshToken, accessToken);
  }
}

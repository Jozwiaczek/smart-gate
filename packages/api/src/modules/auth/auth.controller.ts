import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';

import { CookieRequest, CookieResponse, LoginRequest } from '../../interfaces/cookie-types';
import { constants, cookiesUtils } from '../../utils';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './strategies/local/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() request: LoginRequest, @Res({ passthrough: true }) response: CookieResponse) {
    const {
      user,
      body: { keepMeLoggedIn },
    } = request;
    const genTokens = await this.authService.login(user, keepMeLoggedIn);
    const { setCookies } = cookiesUtils;
    setCookies(genTokens, response);
    // TODO: add separate method for extracting user
    // eslint-disable-next-line no-unused-vars
    const { password, ...rest } = user;
    return rest;
  }

  @Post('register')
  async register(
    @Body() user: CreateUserDto,
    @Res({ passthrough: true }) response: CookieResponse,
  ) {
    const newUser = await this.authService.register(user).catch(() => {
      throw new BadRequestException('User already exists');
    });
    const genTokens = await this.authService.login(newUser, false);
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

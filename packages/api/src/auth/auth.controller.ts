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
import { CookieOptions } from 'express';
import ms from 'ms';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './strategies/local/local-auth.guard';
import { TokenConfig } from '../utils/constants';
import { CookiePayload } from './decorators/cookiePayload.decorator';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { CookieRequest, CookieResponse, LoginRequest } from '../interfaces/cookie-types';
import { Payload, Tokens } from '../interfaces/token-types';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() request: LoginRequest, @Res({ passthrough: true }) response: CookieResponse) {
    const {
      user,
      body: { keepMeLogin },
    } = request;
    const tokens = this.authService.generateTokens(user, keepMeLogin);
    AuthController.setCookies(tokens, keepMeLogin, response);
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
    const tokens = this.authService.generateTokens(newUser, false);
    AuthController.setCookies(tokens, false, response);
    const { password, ...rest } = user;
    return rest;
  }

  @Get('refresh')
  async refresh(
    @CookiePayload() payload: Payload,
    @Req() request: CookieRequest,
    @Res({ passthrough: true }) response: CookieResponse,
  ) {
    const { cookies } = request;
    const newTokens = await this.authService.refreshTokens({
      refreshToken: cookies[TokenConfig.refreshToken.name],
      logoutToken: cookies[TokenConfig.logoutToken.name],
      accessToken: cookies[TokenConfig.accessToken.name],
    });
    AuthController.setCookies(newTokens, payload.keepMeLogin, response);
  }

  @Get('logout')
  async logout(
    @Req() request: CookieRequest,
    @Res({ passthrough: true }) response: CookieResponse,
  ) {
    const { cookies } = request;
    const refreshToken = cookies[TokenConfig.refreshToken.name];
    if (!refreshToken) throw new BadRequestException('Invalid cookies');

    await this.authService.logout(refreshToken);

    response.clearCookie(TokenConfig.refreshToken.name);
    response.clearCookie(TokenConfig.logoutToken.name);
    response.clearCookie(TokenConfig.accessToken.name);
  }

  private static setCookies(tokens: Tokens, keepMeLogin: boolean, response: CookieResponse) {
    const { accessToken, logoutToken, refreshToken } = tokens;
    const options: CookieOptions = {
      httpOnly: true,
      path: '/',
    };

    if (keepMeLogin) {
      response.cookie(TokenConfig.refreshToken.name, refreshToken, {
        ...options,
        expires: new Date(Date.now() + ms(TokenConfig.refreshToken.keepMeLogin.expiresIn)),
      });
    } else {
      response.cookie(TokenConfig.refreshToken.name, refreshToken, {
        ...options,
        expires: new Date(Date.now() + ms(TokenConfig.refreshToken.withOutKeepMeLogin.expiresIn)),
      });
      response.cookie(TokenConfig.logoutToken.name, logoutToken, {
        ...options,
        expires: undefined,
      });
    }
    response.cookie(TokenConfig.accessToken.name, accessToken, {
      ...options,
      expires: new Date(Date.now() + ms(TokenConfig.accessToken.expiresIn)),
    });
  }
}

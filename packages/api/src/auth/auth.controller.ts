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
import { UserEntity } from '../database/entities/user.entity';
import { AuthService, Tokens } from './auth.service';
import { LocalAuthGuard } from './strategies/local/local-auth.guard';
import { TokenConfig } from '../utils/constants';
import { CookiePayload } from './decorators/payload.decorator';
import { CookieRequest, CookieResponse, LoginRequest, Payload } from '../utils/models';

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
  async register(@Body() user: UserEntity) {
    return this.authService.register(user);
  }

  @Get('refresh')
  async refresh(
    @CookiePayload() payload: Payload,
    @Req() request: CookieRequest,
    @Res({ passthrough: true }) response: CookieResponse,
  ) {
    const newTokens = await this.authService.refreshTokens({
      refreshToken: request.cookies[TokenConfig.refreshToken.name],
      logoutToken: request.cookies[TokenConfig.logoutToken.name],
      accessToken: request.cookies[TokenConfig.accessToken.name],
    });
    AuthController.setCookies(newTokens, payload.keepMeLogin, response);
  }

  @Get('logout')
  async logout(
    @Req() request: CookieRequest,
    @Res({ passthrough: true }) response: CookieResponse,
  ) {
    const refreshToken = request.cookies[TokenConfig.refreshToken.name];
    if (!refreshToken) throw new BadRequestException('Invalid cookies');

    await this.authService.logout(refreshToken);

    response.clearCookie(TokenConfig.refreshToken.name);
    response.clearCookie(TokenConfig.logoutToken.name);
    response.clearCookie(TokenConfig.accessToken.name);
  }

  private static setCookies(tokens: Tokens, keepMeLogin: boolean, response: CookieResponse) {
    const options: CookieOptions = {
      httpOnly: true,
      path: '/',
    };
    response.cookie(TokenConfig.refreshToken.name, tokens.refreshToken, {
      ...options,
      expires: new Date(
        Date.now() +
          (keepMeLogin
            ? ms(TokenConfig.refreshToken.keepMe.expiresIn)
            : ms(TokenConfig.refreshToken.withOutKeepMe.expiresIn)),
      ),
    });
    response.cookie(TokenConfig.accessToken.name, tokens.accessToken, {
      ...options,
      expires: new Date(Date.now() + ms(TokenConfig.accessToken.expiresIn)),
    });
    if (!keepMeLogin) {
      response.cookie(TokenConfig.logoutToken.name, tokens.logoutToken, {
        ...options,
        expires: undefined,
      });
    }
  }
}

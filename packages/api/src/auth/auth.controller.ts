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
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './strategies/local/local-auth.guard';
import { TokenConfig } from '../utils/constants';
import { CookiePayload } from './decorators/cookiePayload.decorator';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { CookieRequest, CookieResponse, LoginRequest } from '../interfaces/cookie-types';
import { GeneratedTokens, Payload } from '../interfaces/token-types';
import { OnlyAuthenticatedGuard } from './guards/only-authenticated.guard';

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

    const genTokens = await this.authService.login(user, keepMeLogin);
    AuthController.setCookies(genTokens, keepMeLogin, response, true);
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
    AuthController.setCookies(genTokens, false, response, true);
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
    AuthController.setCookies(newTokens, payload.keepMeLogin, response, false);
  }

  @UseGuards(OnlyAuthenticatedGuard)
  @Get('logout')
  async logout(
    @Req() request: CookieRequest,
    @CookiePayload() payload: Payload,
    @Res({ passthrough: true }) response: CookieResponse,
  ) {
    const { cookies } = request;
    const refreshToken = cookies[TokenConfig.refreshToken.name];
    await this.authService.logout(refreshToken, payload.sub);

    response.clearCookie(TokenConfig.refreshToken.name);
    response.clearCookie(TokenConfig.logoutToken.name);
    response.clearCookie(TokenConfig.accessToken.name);
  }

  private static setCookies(
    tokenGen: GeneratedTokens,
    keepMeLogin: boolean,
    response: CookieResponse,
    setRefreshToken: boolean,
  ) {
    const {
      tokens: { accessToken, logoutToken, refreshToken },
      accessExpiration,
      refreshExpiration,
    } = tokenGen;
    const options: CookieOptions = {
      httpOnly: true,
      path: '/',
    };

    if (!keepMeLogin) {
      response.cookie(TokenConfig.logoutToken.name, logoutToken, {
        ...options,
        expires: undefined,
      });
    }
    if (setRefreshToken) {
      response.cookie(TokenConfig.refreshToken.name, refreshToken, {
        ...options,
        expires: refreshExpiration,
      });
    }

    response.cookie(TokenConfig.accessToken.name, accessToken, {
      ...options,
      expires: accessExpiration,
    });
  }
}

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
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './strategies/local/local-auth.guard';
import { CookiePayload } from './decorators/cookiePayload.decorator';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { CookieRequest, CookieResponse, LoginRequest } from '../interfaces/cookie-types';
import { TokenPayload } from '../interfaces/token-types';
import { constants, cookiesUtils } from '../utils';

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
    const { setCookies } = cookiesUtils;
    setCookies(genTokens, keepMeLogin, response, true);
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
    setCookies(genTokens, false, response, true);
    const { password, ...rest } = user;
    return rest;
  }

  @Get('logout')
  async logout(
    @Req() request: CookieRequest,
    @CookiePayload() payload: TokenPayload,
    @Res({ passthrough: true }) response: CookieResponse,
  ) {
    const { tokenConfig } = constants;
    response.clearCookie(tokenConfig.refreshToken.name);
    response.clearCookie(tokenConfig.logoutToken.name);
    response.clearCookie(tokenConfig.accessToken.name);

    const { getCookies } = cookiesUtils;
    const cookies = getCookies(request);
    const refreshToken = cookies[tokenConfig.refreshToken.name];
    await this.authService.logout(refreshToken, payload.sub);
  }
}

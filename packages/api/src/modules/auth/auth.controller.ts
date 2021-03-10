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
import { TokenPayload } from '../../interfaces/token-types';
import { constants, cookiesUtils } from '../../utils';
import { ValidationPipe } from '../../utils/validation.pipe';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginUserDto } from '../users/dto/login-user.dto';
import { AuthService } from './auth.service';
import { Auth } from './decorators/auth.decorator';
import { CookiePayload } from './decorators/cookiePayload.decorator';

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

    const { email, firstName, lastName, roles } = user;
    const loginUserInfo: LoginUserInfo = {
      user: {
        email,
        firstName,
        lastName,
        roles,
      },
      expirationDate: genTokens.expiration.getTime(),
    };
    return loginUserInfo;
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
      password: user.password,
    };

    const [genTokens] = await this.authService.login(loginUser);
    const { setCookies } = cookiesUtils;
    setCookies(genTokens, response);

    const { email, firstName, lastName, roles } = newUser;
    const loginUserInfo: LoginUserInfo = {
      user: {
        email,
        firstName,
        lastName,
        roles,
      },
      expirationDate: genTokens.expiration.getTime(),
    };
    return loginUserInfo;
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

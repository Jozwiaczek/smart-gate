import { Injectable } from '@nestjs/common';

import { GeneratedTokens } from '../../../interfaces/token-types';
import { CookieService } from '../cookie/cookie.service';
import { CookieResponse } from '../cookie/interfaces/cookie-types';
import { TokenConfigService } from './config/token-config.service';
import { TokenType } from './token.service';

@Injectable()
export class TokenCookieService {
  constructor(
    private readonly tokenConfigService: TokenConfigService,
    private readonly cookieService: CookieService,
  ) {}

  setCookieTokens(tokens: GeneratedTokens, res: CookieResponse): void {
    const {
      refreshToken: { name: refreshTokenName },
      accessToken: { name: accessTokenName },
      logoutToken: { name: logoutTokenName },
    } = this.tokenConfigService.getTokenConfig();

    const {
      tokens: { accessToken, logoutToken, refreshToken },
      expiration,
    } = tokens;

    if (logoutToken) {
      this.cookieService.setCookie(res, logoutTokenName, logoutToken, undefined);
    }

    if (refreshToken) {
      this.cookieService.setCookie(res, refreshTokenName, refreshToken, expiration);
    }

    this.cookieService.setCookie(res, accessTokenName, accessToken, expiration);
  }

  getCookieToken(tokenType: TokenType): string {
    const { accessToken, refreshToken, logoutToken } = this.tokenConfigService.getTokenConfig();

    switch (tokenType) {
      case 'ACCESS':
        return this.cookieService.getCookie(accessToken.name);
      case 'LOGOUT':
        return this.cookieService.getCookie(logoutToken.name);
      case 'REFRESH':
        return this.cookieService.getCookie(refreshToken.name);
      default:
        throw Error(`Invalid token type: '${tokenType}'.`);
    }
  }

  clearAllCookieTokens(res: CookieResponse): void {
    const { accessToken, refreshToken, logoutToken } = this.tokenConfigService.getTokenConfig();

    this.cookieService.clearCookie(res, accessToken.name);
    this.cookieService.clearCookie(res, logoutToken.name);
    this.cookieService.clearCookie(res, refreshToken.name);
  }
}

import { Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';

import { CookieRequest, CookieResponse } from '../../../interfaces/cookie-types';
import { CookieConfigService } from './config/cookie-config.service';

@Injectable({ scope: Scope.REQUEST })
export class CookieService {
  constructor(
    @Inject(REQUEST) private request: CookieRequest,
    private readonly cookieConfigService: CookieConfigService,
  ) {}

  getCookie(key: string): string {
    if (this.cookieConfigService.getIsProduction()) {
      return this.request.signedCookies[key];
    }

    return this.request.cookies[key];
  }

  setCookie(res: CookieResponse, key: string, value: string, expires?: Date): void {
    const options = this.cookieConfigService.getCookieOptions();

    res.cookie(key, value, { ...options, expires });
  }

  clearCookie(res: CookieResponse, key: string): void {
    const options = this.cookieConfigService.getCookieOptions();

    res.cookie(key, '', { ...options, maxAge: 0 });
  }
}

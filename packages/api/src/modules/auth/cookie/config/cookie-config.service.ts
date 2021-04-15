import { Injectable } from '@nestjs/common';
import { CookieOptions } from 'express';

import { Config } from '../../../config/config';

@Injectable()
export class CookieConfigService {
  constructor(private readonly config: Config) {}

  getIsProduction() {
    return this.config.environment.isProd;
  }

  getCookieOptions(): CookieOptions {
    const {
      environment: { isProd },
    } = this.config;

    return {
      httpOnly: true,
      path: '/',
      secure: isProd,
      signed: isProd,
      sameSite: isProd ? 'strict' : undefined,
    };
  }
}

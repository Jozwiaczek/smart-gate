import { Injectable } from '@nestjs/common';

import { Config } from '../../../config/config';

interface TokenConfig {
  accessToken: {
    name: string;
    secret: string;
    expirationTime: string;
  };
  logoutToken: {
    name: string;
    secret: string;
  };
  refreshToken: {
    name: string;
    expirationTimeWithKeepMeLoggedIn: string;
    expirationTimeWithoutKeepMeLoggedIn: string;
  };
}

@Injectable()
export class TokenConfigService {
  constructor(private readonly config: Config) {}

  getTokenConfig(): TokenConfig {
    const {
      tokens: { accessToken, refreshToken, logoutToken },
    } = this.config;
    return {
      logoutToken,
      accessToken,
      refreshToken,
    };
  }
}

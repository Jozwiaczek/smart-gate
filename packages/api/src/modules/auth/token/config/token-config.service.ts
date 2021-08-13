import { Injectable } from '@nestjs/common';

import { constants } from '../../../../utils';
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
      AUTH_TOKENS: {
        accessToken: { name: accessTokenName },
        refreshToken: { name: refreshTokenName },
        logoutToken: { name: logoutTokenName },
      },
    } = constants;

    const {
      authTokens: { accessToken, refreshToken, logoutToken },
    } = this.config;
    return {
      logoutToken: {
        ...logoutToken,
        name: logoutTokenName,
      },
      accessToken: {
        ...accessToken,
        name: accessTokenName,
      },
      refreshToken: {
        ...refreshToken,
        name: refreshTokenName,
      },
    };
  }
}

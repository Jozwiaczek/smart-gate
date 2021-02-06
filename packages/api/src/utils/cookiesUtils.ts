import { CookieOptions } from 'express';

import { CookieRequest, CookieResponse } from '../interfaces/cookie-types';
import { GeneratedTokens } from '../interfaces/token-types';
import Constants from './constants';

const setCookies = (
  tokenGen: GeneratedTokens,
  keepMeLogin: boolean,
  response: CookieResponse,
  setRefreshToken: boolean,
) => {
  const {
    tokens: { accessToken, logoutToken, refreshToken },
    accessExpiration,
    refreshExpiration,
  } = tokenGen;
  const { tokenConfig } = Constants;
  const isDevelopment = process.env.ENV === 'development';
  const options: CookieOptions = {
    httpOnly: true,
    path: '/',
    secure: !isDevelopment,
    sameSite: isDevelopment ? undefined : 'strict',
  };

  if (!keepMeLogin) {
    response.cookie(tokenConfig.logoutToken.name, logoutToken, {
      ...options,
      expires: undefined,
    });
  }
  if (setRefreshToken) {
    response.cookie(tokenConfig.refreshToken.name, refreshToken, {
      ...options,
      expires: refreshExpiration,
    });
  }
  response.cookie(tokenConfig.accessToken.name, accessToken, {
    ...options,
    expires: accessExpiration,
  });
};

const getCookies = (request: CookieRequest) => {
  const isDevelopment = process.env.ENV === 'development';
  return isDevelopment ? request.cookies : request.signedCookies;
};

export default { setCookies, getCookies };

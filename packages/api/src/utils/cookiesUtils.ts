import { CookieOptions } from 'express';

import { CookieRequest, CookieResponse } from '../interfaces/cookie-types';
import { GeneratedTokens } from '../interfaces/token-types';
import Constants from './constants';

const setCookies = (tokenGen: GeneratedTokens, response: CookieResponse) => {
  const {
    tokens: { accessToken, logoutToken, refreshToken },
    expiration,
  } = tokenGen;
  const { tokenConfig } = Constants;
  const isDevelopment = process.env.NODE_ENV === 'development';
  const options: CookieOptions = {
    httpOnly: true,
    path: '/',
    secure: !isDevelopment,
    signed: !isDevelopment,
    sameSite: isDevelopment ? undefined : 'none',
  };

  if (logoutToken) {
    response.cookie(tokenConfig.logoutToken.name, logoutToken, {
      ...options,
      expires: undefined,
    });
  }
  if (refreshToken) {
    response.cookie(tokenConfig.refreshToken.name, refreshToken, {
      ...options,
      expires: expiration,
    });
  }
  response.cookie(tokenConfig.accessToken.name, accessToken, {
    ...options,
    expires: expiration,
  });
};

const getCookies = (request: CookieRequest) => {
  const isDevelopment = process.env.NODE_ENV === 'development';
  return isDevelopment ? request.cookies : request.signedCookies;
};

export default { setCookies, getCookies };

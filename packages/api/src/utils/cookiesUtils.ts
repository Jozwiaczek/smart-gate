import { CookieOptions } from 'express';

import { CookieRequest, CookieResponse } from '../interfaces/cookie-types';
import { GeneratedTokens } from '../interfaces/token-types';
import Constants from './constants';

const {
  tokenConfig: {
    accessToken: { name: accessTokenName },
    refreshToken: { name: refreshTokenName },
    logoutToken: { name: logoutTokenName },
  },
} = Constants;

const isDevelopment = process.env.NODE_ENV === 'development';

const options: CookieOptions = {
  httpOnly: true,
  path: '/',
  secure: !isDevelopment,
  signed: !isDevelopment,
  sameSite: isDevelopment ? undefined : 'none',
};

const setCookies = (tokenGen: GeneratedTokens, response: CookieResponse) => {
  const {
    tokens: { accessToken, logoutToken, refreshToken },
    expiration,
  } = tokenGen;

  if (logoutToken) {
    response.cookie(logoutTokenName, logoutToken, {
      ...options,
      expires: undefined,
    });
  }
  if (refreshToken) {
    response.cookie(refreshTokenName, refreshToken, {
      ...options,
      expires: expiration,
    });
  }
  response.cookie(accessTokenName, accessToken, {
    ...options,
    expires: expiration,
  });
};

const getCookies = (request: CookieRequest) => {
  return isDevelopment ? request.cookies : request.signedCookies;
};

const clearCookies = (response: CookieResponse) => {
  const tokensName = [accessTokenName, refreshTokenName, logoutTokenName];
  tokensName.forEach((tokenName) => {
    response.cookie(tokenName, '', { ...options, maxAge: 0 });
  });
};

export default { setCookies, getCookies, clearCookies };

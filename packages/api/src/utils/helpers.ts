import { CookieRequest } from '../interfaces/cookie-types';

export const getCookies = (request: CookieRequest) => {
  const isDevelopment = process.env.ENV === 'development';
  return isDevelopment ? request.cookies : request.signedCookies;
};

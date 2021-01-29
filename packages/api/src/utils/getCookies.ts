import { CookieRequest } from '../interfaces/cookie-types';

const getCookies = (request: CookieRequest) => {
  const isDevelopment = process.env.ENV === 'development';
  return isDevelopment ? request.cookies : request.signedCookies;
};

export default getCookies;

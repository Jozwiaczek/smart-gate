import { createParamDecorator, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import jsonwebtoken from 'jsonwebtoken';
import { CookieRequest } from '../../interfaces/cookie-types';
import { cookiesUtils, constants } from '../../utils';
import { TokenPayload } from '../../interfaces/token-types';

export const CookiePayload = createParamDecorator(
  (data: unknown, context: ExecutionContext): TokenPayload => {
    const { tokenConfig } = constants;
    const request = context.switchToHttp().getRequest<CookieRequest>();
    const { getCookies } = cookiesUtils;
    const cookies = getCookies(request);
    const refresh_token = cookies[tokenConfig.refreshToken.name];
    const { REFRESH_SECRET } = process.env;
    if (!REFRESH_SECRET) {
      throw new Error('refresh secret not set');
    }
    const decode = jsonwebtoken.decode(refresh_token) as TokenPayload;
    if (!decode) {
      throw new UnauthorizedException('Invalid token payload');
    }
    return decode;
  },
);

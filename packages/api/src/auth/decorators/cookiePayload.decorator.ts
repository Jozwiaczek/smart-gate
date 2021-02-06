import { createParamDecorator, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import jsonwebtoken from 'jsonwebtoken';

import { CookieRequest } from '../../interfaces/cookie-types';
import { Payload } from '../../interfaces/token-types';
import { constants, getCookies } from '../../utils';

export const CookiePayload = createParamDecorator(
  (data: unknown, context: ExecutionContext): TokenPayload => {
    const { tokenConfig } = constants;
    const request = context.switchToHttp().getRequest();
    if (request.payload) {
      return request.payload;
    }
    const { getCookies } = cookiesUtils;
    const cookies = getCookies(request);
    const refresh_token = cookies[tokenConfig.refreshToken.name];
    const { REFRESH_SECRET } = process.env;
    if (!REFRESH_SECRET) {
      throw new Error('refresh secret not set');
    }
    try {
      return jsonwebtoken.verify(refresh_token, REFRESH_SECRET) as TokenPayload;
    } catch (err) {
      throw new UnauthorizedException('Invalid token payload');
    }
  },
);

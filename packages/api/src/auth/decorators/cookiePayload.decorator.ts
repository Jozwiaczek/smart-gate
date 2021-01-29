import { createParamDecorator, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import jsonwebtoken from 'jsonwebtoken';
import { Payload } from '../../interfaces/token-types';
import { CookieRequest } from '../../interfaces/cookie-types';
import { getCookies, constants } from '../../utils';

export const CookiePayload = createParamDecorator(
  (data: unknown, context: ExecutionContext): Payload => {
    const { tokenConfig } = constants;
    const request = context.switchToHttp().getRequest<CookieRequest>();
    const cookies = getCookies(request);
    const refresh_token = cookies[tokenConfig.refreshToken.name];
    const decode = jsonwebtoken.decode(refresh_token) as Payload;
    if (!decode) {
      throw new UnauthorizedException('Invalid token payload');
    }
    return decode;
  },
);

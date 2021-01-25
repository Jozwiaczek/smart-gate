import { createParamDecorator, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import jsonwebtoken from 'jsonwebtoken';
import { TokenConfig } from '../../utils/constants';
import { CookieRequest, Payload } from '../../utils/models';

export const CookiePayload = createParamDecorator(
  (data: unknown, context: ExecutionContext): Payload => {
    const request = context.switchToHttp().getRequest<CookieRequest>();
    const refresh_token = request.cookies[TokenConfig.refreshToken.name];
    const decode = jsonwebtoken.decode(refresh_token) as Payload;
    if (!decode) {
      throw new UnauthorizedException('Invalid token payload');
    }
    return decode;
  },
);

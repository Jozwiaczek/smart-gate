import { createParamDecorator, ExecutionContext, UnauthorizedException } from '@nestjs/common';

import { TokenPayload } from '../../../interfaces/token-types';

export const CookiePayload = createParamDecorator<unknown, ExecutionContext, TokenPayload>(
  (data: unknown, context: ExecutionContext): TokenPayload => {
    const request = context.switchToHttp().getRequest<{ payload: TokenPayload }>();
    if (!request.payload) {
      throw new UnauthorizedException('Invalid token payload');
    }
    return request.payload;
  },
);

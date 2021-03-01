import { createParamDecorator, ExecutionContext, UnauthorizedException } from '@nestjs/common';

import { AccessPayload } from '../../../interfaces/token-types';

export const CookiePayload = createParamDecorator(
  (data: unknown, context: ExecutionContext): AccessPayload => {
    const request = context.switchToHttp().getRequest();
    if (!request.payload) {
      throw new UnauthorizedException('Invalid token payload');
    }
    return request.payload;
  },
);

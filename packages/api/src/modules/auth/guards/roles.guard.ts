import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { Role } from '../../../enums/role.enum';
import { TokenPayload } from '../../../interfaces/token-types';
import { constants } from '../../../utils';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(constants.ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles || !requiredRoles.length) {
      return true;
    }
    const { payload } = context.switchToHttp().getRequest<{ payload: TokenPayload }>();
    return payload && payload.roles && requiredRoles.some((role) => payload.roles?.includes(role));
  }
}

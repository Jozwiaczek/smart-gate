import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '../role.enum';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    console.log('roles');
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    const { payload } = context.switchToHttp().getRequest();
    console.log(payload);

    if (!requiredRoles || !requiredRoles.length) {
      return true;
    }

    console.log(requiredRoles);

    return payload && payload.roles && requiredRoles.some((role) => payload.roles?.includes(role));
  }
}

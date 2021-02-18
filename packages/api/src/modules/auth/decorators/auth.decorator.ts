import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';

import { OnlyAuthenticatedGuard } from '../guards/only-authenticated.guard';
import { RolesGuard } from '../guards/roles.guard';
import { Role } from '../role.enum';
import { ROLES_KEY } from './roles.decorator';

export function Auth(...roles: Role[]) {
  return applyDecorators(
    SetMetadata(ROLES_KEY, roles),
    UseGuards(OnlyAuthenticatedGuard, RolesGuard),
  );
}

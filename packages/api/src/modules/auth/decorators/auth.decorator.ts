import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';

import { Role } from '../../../enums/role.enum';
import { OnlyAuthenticatedGuard } from '../guards/only-authenticated.guard';
import { RolesGuard } from '../guards/roles.guard';
import { ROLES_KEY } from './roles.decorator';

export function Auth(...roles: Role[]) {
  return applyDecorators(
    SetMetadata(ROLES_KEY, roles),
    UseGuards(OnlyAuthenticatedGuard, RolesGuard),
  );
}

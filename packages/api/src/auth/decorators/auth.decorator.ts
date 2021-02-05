import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { Role } from '../role.enum';
import { RolesGuard } from '../guards/roles.guard';
import { ROLES_KEY } from './roles.decorator';
import { OnlyAuthenticatedGuard } from '../guards/only-authenticated.guard';

export function Auth(...roles: Role[]) {
  return applyDecorators(
    SetMetadata(ROLES_KEY, roles),
    UseGuards(OnlyAuthenticatedGuard, RolesGuard),
  );
}

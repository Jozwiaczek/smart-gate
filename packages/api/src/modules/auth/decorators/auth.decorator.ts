import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';

import { Role } from '../../../enums/role.enum';
import { constants } from '../../../utils';
import { OnlyAuthenticatedGuard } from '../guards/only-authenticated.guard';
import { RolesGuard } from '../guards/roles.guard';

export const Auth = (...roles: Role[]) =>
  applyDecorators(
    SetMetadata(constants.ROLES_KEY, roles),
    UseGuards(OnlyAuthenticatedGuard, RolesGuard),
  );

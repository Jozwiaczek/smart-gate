import { IsArray, IsOptional } from 'class-validator';

import { Role } from '../../../enums/role.enum';

export class UpdateInvitationDto {
  @IsOptional()
  @IsArray()
  roles?: Array<Role>;
}

import { IsArray, IsEmail, IsOptional } from 'class-validator';

import { Role } from '../../../enums/role.enum';

export class CreateInvitationDto {
  @IsEmail()
  email: string;

  @IsOptional()
  @IsArray()
  roles?: [Role];
}

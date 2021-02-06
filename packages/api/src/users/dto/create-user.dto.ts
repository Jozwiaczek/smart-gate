import { IsEmail, IsString } from 'class-validator';

import { Role } from '../../auth/role.enum';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  roles: Array<Role>;

  firstName?: string | undefined;

  lastName?: string | undefined;
}

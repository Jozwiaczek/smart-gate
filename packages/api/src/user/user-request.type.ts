import { IsString, IsEmail } from 'class-validator';
import { Role } from '../auth/role.enum';

export class UserRequestType {
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  roles: Array<Role>;

  firstName?: string | undefined;

  lastName?: string | undefined;
}

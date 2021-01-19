import { IsInt, IsEmail, IsNotEmpty } from 'class-validator';
import { Role } from '../../auth/role.enum';

export class UserEntity {
  @IsInt()
  public id: string;

  @IsEmail()
  public email: string;

  @IsNotEmpty()
  public password: string;

  public firstName: string | null;

  public lastName: string | null;

  public roles: Array<Role>;
}

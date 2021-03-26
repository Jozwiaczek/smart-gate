import { IsEmail, IsString } from 'class-validator';

import { PasswordDto } from './password.dto';

export class RegisterDto extends PasswordDto {
  @IsString()
  code: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;
}

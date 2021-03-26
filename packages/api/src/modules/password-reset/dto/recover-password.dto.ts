import { IsEmail, IsString } from 'class-validator';

import { PasswordDto } from '../../auth/dto/password.dto';

export class RecoverPasswordDto extends PasswordDto {
  @IsEmail()
  email: string;

  @IsString()
  code: string;
}

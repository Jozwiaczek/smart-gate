import { IsEmail, IsString } from 'class-validator';

import { UpdatePasswordDto } from './update-password.dto';

export class RecoverPasswordDto extends UpdatePasswordDto {
  @IsEmail()
  email: string;

  @IsString()
  code: string;
}

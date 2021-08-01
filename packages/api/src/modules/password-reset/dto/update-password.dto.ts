import { IsEmail } from 'class-validator';

import { PasswordDto } from '../../auth/dto/password.dto';

export class UpdatePasswordDto extends PasswordDto {
  @IsEmail()
  email: string;
}

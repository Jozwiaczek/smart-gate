import { IsBoolean, IsEmail } from 'class-validator';

import { PasswordDto } from './password.dto';

export class LoginDto extends PasswordDto {
  @IsEmail()
  email: string;

  @IsBoolean()
  keepMeLoggedIn: boolean;
}

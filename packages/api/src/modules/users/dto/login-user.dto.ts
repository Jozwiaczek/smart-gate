import { IsBoolean, IsEmail, IsString } from 'class-validator';

export class LoginUserDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsBoolean()
  keepMeLoggedIn: boolean;
}

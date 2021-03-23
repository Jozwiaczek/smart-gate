import { IsEmail } from 'class-validator';

export class CreatePasswordResetDto {
  @IsEmail()
  email: string;
}

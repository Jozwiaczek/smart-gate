import { IsString, Length, Matches } from 'class-validator';

export class PasswordDto {
  @IsString()
  @Length(8)
  @Matches(/[a-z]/)
  @Matches(/[A-Z]/)
  @Matches(/[0-9]/)
  @Matches(/[^A-Za-z0-9]/)
  password: string;
}

import { IsString, Length, Matches } from 'class-validator';

export class PasswordDto {
  @IsString()
  @Length(8)
  @Matches(/[a-z]/)
  @Matches(/[A-Z]/)
  @Matches(/\d/)
  @Matches(/[^A-Za-z\d]/)
  password: string;
}

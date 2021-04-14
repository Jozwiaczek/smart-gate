import { IsArray, IsString } from 'class-validator';

export class DeleteUsersDto {
  @IsArray()
  @IsString({ each: true })
  ids: Array<string>;
}

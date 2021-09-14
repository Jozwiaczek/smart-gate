import { IsArray, IsString } from 'class-validator';

export class RemoveManyHistoryDto {
  @IsArray()
  @IsString({ each: true })
  ids: Array<string>;
}

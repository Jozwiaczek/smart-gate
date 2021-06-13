import { IsArray } from 'class-validator';

export class RemoveManyInvitationDto {
  @IsArray()
  ids: Array<string>;
}

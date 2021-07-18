import { IsArray, IsOptional, IsString, ValidateNested } from 'class-validator';

import { Role } from '../../../enums/role.enum';

export class SendPushNotificationDto {
  @IsString()
  title: string;

  @IsString()
  body: string;

  @IsOptional()
  @ValidateNested()
  options?: PushNotificationOptions;

  @IsOptional()
  @IsArray()
  roles?: [Role];
}

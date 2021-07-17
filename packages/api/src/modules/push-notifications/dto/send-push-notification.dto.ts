import { IsOptional, IsString, ValidateNested } from 'class-validator';

export class SendPushNotificationDto {
  @IsString()
  title: string;

  @IsString()
  body: string;

  @IsOptional()
  @ValidateNested()
  options?: PushNotificationOptions;
}

import { ValidateNested } from 'class-validator';
import { PushSubscription } from 'web-push';

import { UserEntity } from '../../database/entities/user.entity';

export class SubscribePushNotificationDto {
  @ValidateNested()
  subscription: PushSubscription;

  @ValidateNested()
  user: UserEntity;
}

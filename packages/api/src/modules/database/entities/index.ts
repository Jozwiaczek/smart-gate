import { ConfigEntity } from './config.entity';
import { InvitationEntity } from './invitation.entity';
import { PushNotificationEntity } from './pushNotification.entity';
import { RefreshTokenEntity } from './refreshToken.entity';
import { UserEntity } from './user.entity';

export default [
  UserEntity,
  RefreshTokenEntity,
  InvitationEntity,
  PushNotificationEntity,
  ConfigEntity,
];

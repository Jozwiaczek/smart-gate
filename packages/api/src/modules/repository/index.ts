import { ConfigRepository } from './config.repository';
import { InvitationRepository } from './invitation.repository';
import { PushNotificationRepository } from './push-notification.repository';
import { RefreshTokenRepository } from './refresh-token.repository';
import { UserRepository } from './user.repository';

export default [
  UserRepository,
  InvitationRepository,
  RefreshTokenRepository,
  PushNotificationRepository,
  ConfigRepository,
];

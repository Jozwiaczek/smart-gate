import { PushNotificationEntity } from '../database/entities/pushNotification.entity';
import { BaseRepository } from './base.repository';

export class PushNotificationRepository extends BaseRepository(PushNotificationEntity) {}

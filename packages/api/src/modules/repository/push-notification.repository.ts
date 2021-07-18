import { In } from 'typeorm';

import { Role } from '../../enums/role.enum';
import { PushNotificationEntity } from '../database/entities/pushNotification.entity';
import { BaseRepository } from './base.repository';

export class PushNotificationRepository extends BaseRepository(PushNotificationEntity) {
  async findByRoles(roles: Role[]): Promise<Array<PushNotificationEntity>> {
    return this.find({
      relations: ['user'],
      where: {
        user: {
          roles: In(roles),
        },
      },
    });
  }
}

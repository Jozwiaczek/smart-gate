import { Column, Entity, ManyToOne } from 'typeorm';

import { BaseEntity } from './base.entity';
// eslint-disable-next-line import/no-cycle
import { UserEntity } from './user.entity';

@Entity('push_notifications')
export class PushNotificationEntity extends BaseEntity {
  @Column({
    type: 'varchar',
    unique: true,
  })
  public endpoint: string;

  @Column({
    type: 'varchar',
  })
  public p256dh: string;

  @Column({
    type: 'varchar',
  })
  public auth: string;

  @ManyToOne(() => UserEntity, (user) => user.pushNotifications, { onDelete: 'CASCADE' })
  public user: UserEntity;
}

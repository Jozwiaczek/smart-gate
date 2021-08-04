import { Column, Entity, Index, OneToMany } from 'typeorm';

import { Role } from '../../../enums/role.enum';
import { BaseEntity } from './base.entity';
// eslint-disable-next-line import/no-cycle
import { InvitationEntity } from './invitation.entity';
// eslint-disable-next-line import/no-cycle
import { PushNotificationEntity } from './pushNotification.entity';
// eslint-disable-next-line import/no-cycle
import { RefreshTokenEntity } from './refreshToken.entity';

@Entity('users')
export class UserEntity extends BaseEntity {
  @Column({
    unique: true,
  })
  @Index({ unique: true })
  public email: string;

  @Column({
    type: 'varchar',
  })
  public password: string;

  @Column({
    type: 'varchar',
  })
  public firstName: string;

  @Column({
    type: 'varchar',
  })
  public lastName: string;

  @Column({
    type: 'enum',
    array: true,
    nullable: true,
    enum: Role,
  })
  public roles: Array<Role>;

  @Column({
    type: 'varchar',
    unique: true,
    nullable: true,
  })
  public externalAutomationToken: string;

  @OneToMany(() => RefreshTokenEntity, (token) => token.user, { onDelete: 'CASCADE' })
  public refreshTokens: Promise<[RefreshTokenEntity]>;

  @OneToMany(() => InvitationEntity, (invitation) => invitation.createdBy, { onDelete: 'CASCADE' })
  public createdInvitations: Array<InvitationEntity>;

  @OneToMany(() => InvitationEntity, (invitation) => invitation.updatedBy, { onDelete: 'CASCADE' })
  public updatedInvitations: Array<InvitationEntity>;

  @OneToMany(() => PushNotificationEntity, (pushNotification) => pushNotification.user, {
    onDelete: 'CASCADE',
  })
  public pushNotifications: Array<InvitationEntity>;
}

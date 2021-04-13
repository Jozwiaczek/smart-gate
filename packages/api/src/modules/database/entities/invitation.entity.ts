import { Column, Entity, Index, ManyToOne } from 'typeorm';

import { InvitationStatus } from '../../../enums/invitationStatus.enum';
import { Role } from '../../../enums/role.enum';
import { BaseEntity } from './base.entity';
// eslint-disable-next-line import/no-cycle
import { UserEntity } from './user.entity';

@Entity('invitations')
export class InvitationEntity extends BaseEntity {
  @Index({ unique: true })
  @Column({
    type: 'varchar',
  })
  public email: string;

  @Column({
    type: 'timestamp',
  })
  public expirationDate: Date;

  @Column({
    type: 'enum',
    enum: InvitationStatus,
    default: InvitationStatus.Sent,
  })
  public status: InvitationStatus;

  @Column({
    type: 'enum',
    array: true,
    nullable: true,
    enum: Role,
  })
  public roles: Array<Role>;

  @ManyToOne(() => UserEntity, (user) => user.createdInvitations)
  public createdBy: Promise<UserEntity>;

  @ManyToOne(() => UserEntity, (user) => user.updatedInvitations)
  public updatedBy: Promise<UserEntity>;
}

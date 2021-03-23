import { Column, Entity, Index } from 'typeorm';

import { Role } from '../../../enums/role.enum';
import { BaseEntity } from './base.entity';

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
    array: true,
    nullable: true,
    enum: Role,
  })
  public roles: Array<Role>;
}
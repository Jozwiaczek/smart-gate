import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { Role } from '../../auth/role.enum';

@Entity('invitations')
export class InvitationEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

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

  @CreateDateColumn({
    type: 'timestamp',
  })
  public createdAt: number;
}

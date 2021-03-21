import { Column, Entity, Index, OneToMany } from 'typeorm';

import { Role } from '../../auth/role.enum';
import { BaseEntity } from './base.entity';
// eslint-disable-next-line import/no-cycle
import { RefreshTokenEntity } from './refreshToken.entity';

@Entity('users')
export class UserEntity extends BaseEntity {
  @Column({
    unique: true,
  })
  @Index()
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

  @OneToMany(() => RefreshTokenEntity, (token) => token.user)
  public refreshTokens: Promise<[RefreshTokenEntity]>;
}

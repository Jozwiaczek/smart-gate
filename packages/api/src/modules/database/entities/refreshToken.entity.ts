import { Column, Entity, ManyToOne } from 'typeorm';

import { BaseEntity } from './base.entity';
// eslint-disable-next-line import/no-cycle
import { UserEntity } from './user.entity';

@Entity('refresh_tokens')
export class RefreshTokenEntity extends BaseEntity {
  @Column({
    type: 'timestamp',
  })
  public expirationDate: Date;

  @Column({ type: 'boolean' })
  public keepMeLoggedIn: boolean;

  @ManyToOne(() => UserEntity, (user) => user.refreshTokens, { onDelete: 'CASCADE' })
  public user: Promise<UserEntity>;

  @Column({ type: 'uuid' })
  public userId: string;
}

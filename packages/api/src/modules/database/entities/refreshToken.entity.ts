import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

// eslint-disable-next-line import/no-cycle
import { UserEntity } from './user.entity';

@Entity('refresh_tokens')
export class RefreshTokenEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({
    type: 'timestamp',
  })
  public expirationDate: Date;

  @Column({ type: 'boolean' })
  public keepMeLoggedIn: boolean;

  @ManyToOne(() => UserEntity, (user) => user.refreshTokens)
  public user: Promise<UserEntity>;

  @Column({ type: 'uuid' })
  public userId: string;

  @CreateDateColumn({
    type: 'timestamp',
  })
  public createdAt: number;
}

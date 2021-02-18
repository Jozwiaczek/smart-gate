import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

// eslint-disable-next-line import/no-cycle
import { UserEntity } from './user.entity';

@Entity('refresh_tokens')
export class RefreshTokenEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({
    type: 'varchar',
  })
  public token: string;

  @Column({
    type: 'timestamp',
  })
  public expirationDate: Date;

  @ManyToOne(() => UserEntity, (user) => user.refreshTokens)
  public user: UserEntity;

  @CreateDateColumn({
    type: 'timestamp',
  })
  public createdAt: number;
}

import { Column, Entity, ManyToOne } from 'typeorm';

import { HistoryEvent } from '../../../enums/historyEvent.enum';
import { BaseEntity } from './base.entity';
// eslint-disable-next-line import/no-cycle
import { UserEntity } from './user.entity';

@Entity('history')
export class HistoryEntity extends BaseEntity {
  @Column({
    type: 'enum',
    enum: HistoryEvent,
  })
  public event: HistoryEvent;

  @ManyToOne(() => UserEntity, (user) => user.history, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  public user?: UserEntity;
}

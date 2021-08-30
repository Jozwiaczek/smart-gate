import { HistoryEntity } from '../database/entities/history.entity';
import { UserEntity } from '../database/entities/user.entity';
import { BaseRepository } from './base.repository';

export class HistoryRepository extends BaseRepository(HistoryEntity) {
  async findAllByUser(user: UserEntity): Promise<Array<HistoryEntity>> {
    return this.find({ where: { user } });
  }
}

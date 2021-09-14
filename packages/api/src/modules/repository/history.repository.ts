import { HistoryEntity } from '../database/entities/history.entity';
import { BaseRepository } from './base.repository';

export class HistoryRepository extends BaseRepository(HistoryEntity) {}

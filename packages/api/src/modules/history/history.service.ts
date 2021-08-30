import { BadRequestException, Injectable } from '@nestjs/common';
import * as Sentry from '@sentry/node';

import { GetList } from '../../interfaces/react-admin-types';
import { HistoryEntity } from '../database/entities/history.entity';
import { HistoryRepository } from '../repository/history.repository';
import { UsersService } from '../users/users.service';
import { CreateHistoryDeviceEventDto } from './dto/create-history-device-event.dto';
import { CreateHistoryEventDto } from './dto/create-history-event.dto';
import { CreateHistoryUserEventDto } from './dto/create-history-user-event.dto';
import { RemoveManyHistoryDto } from './dto/remove-many-history.dto';

@Injectable()
export class HistoryService {
  constructor(
    private readonly historyRepository: HistoryRepository,
    private readonly usersService: UsersService,
  ) {}

  async create(createHistoryDto: CreateHistoryUserEventDto): Promise<HistoryEntity>;
  async create(createHistoryDto: CreateHistoryDeviceEventDto): Promise<HistoryEntity>;
  async create(createHistoryEventDto: CreateHistoryEventDto): Promise<HistoryEntity> {
    return this.historyRepository.create(createHistoryEventDto);
  }

  async findAll(): Promise<GetList<HistoryEntity>> {
    const fullHistory = await this.historyRepository.find();
    return { data: fullHistory, total: fullHistory.length };
  }

  async findAllByUserId(userId: string): Promise<GetList<HistoryEntity>> {
    const user = await this.usersService.findOne(userId);
    const userHistory = await this.historyRepository.findAllByUser(user);
    return { data: userHistory, total: userHistory.length };
  }

  async remove(id: string): Promise<true> {
    await this.historyRepository.deleteById(id);
    return true;
  }

  async removeMany(removeManyHistoryDto: RemoveManyHistoryDto): Promise<void> {
    try {
      await this.historyRepository.deleteManyById(removeManyHistoryDto.ids);
    } catch (err) {
      Sentry.captureException(err);
      throw new BadRequestException('Invalid ids list');
    }
  }
}

import { BadRequestException, Injectable } from '@nestjs/common';
import * as Sentry from '@sentry/node';

import { GetList } from '../../interfaces/react-admin-types';
import getPaginationOptions from '../../utils/getPaginationOptions';
import { HistoryEntity } from '../database/entities/history.entity';
import { HistoryRepository } from '../repository/history.repository';
import { UsersService } from '../users/users.service';
import { CreateHistoryDeviceEventDto } from './dto/create-history-device-event.dto';
import { CreateHistoryUserEventDto } from './dto/create-history-user-event.dto';
import { RemoveManyHistoryDto } from './dto/remove-many-history.dto';

@Injectable()
export class HistoryService {
  constructor(
    private readonly historyRepository: HistoryRepository,
    private readonly usersService: UsersService,
  ) {}

  async create(
    createHistoryEventDto: CreateHistoryUserEventDto | CreateHistoryDeviceEventDto,
  ): Promise<HistoryEntity> {
    return this.historyRepository.create(createHistoryEventDto);
  }

  async findAll(query?: FindQuery): Promise<GetList<HistoryEntity>> {
    const [fullHistory, totalOfHistoryRecords] = await this.historyRepository.findAndCount({
      relations: ['user'],
      order: { createdAt: 'DESC' },
      ...getPaginationOptions(query),
    });

    return { data: fullHistory, total: totalOfHistoryRecords };
  }

  async findAllByUserId(userId: string, query?: FindQuery): Promise<GetList<HistoryEntity>> {
    const user = await this.usersService.findOne(userId);

    const userHistory = await this.historyRepository.find({
      where: { user },
      relations: ['user'],
      order: { createdAt: 'DESC' },
      ...getPaginationOptions(query),
    });

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

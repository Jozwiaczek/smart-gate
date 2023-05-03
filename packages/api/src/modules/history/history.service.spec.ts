import { BadRequestException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { Connection, QueryFailedError } from 'typeorm';

import { clearTestDatabase } from '../../../test/utils/clearTestDatabase';
import { testClearRepository } from '../../../test/utils/testClearRepository';
import { testCreateHistoryRecord } from '../../../test/utils/testCreateHistoryRecord';
import { testCreateRandomUser } from '../../../test/utils/testCreateRandomUser';
import { HistoryEvent } from '../../enums/historyEvent.enum';
import { DatabaseModule } from '../database/database.module';
import { HistoryEntity } from '../database/entities/history.entity';
import { UserEntity } from '../database/entities/user.entity';
import { RepositoryModule } from '../repository/repository.module';
import { UsersModule } from '../users/users.module';
import { CreateHistoryDeviceEventDto } from './dto/create-history-device-event.dto';
import { CreateHistoryUserEventDto } from './dto/create-history-user-event.dto';
import { HistoryService } from './history.service';

describe('history service', () => {
  let connection: Connection;
  let historyService: HistoryService;

  beforeEach(async () => {
    await clearTestDatabase();

    const testingModule = await Test.createTestingModule({
      imports: [DatabaseModule, RepositoryModule, UsersModule],
      providers: [HistoryService],
    }).compile();

    connection = testingModule.get(Connection);
    historyService = testingModule.get(HistoryService);
  });

  afterEach(async () => {
    await connection.close();
  });

  describe('findAll()', () => {
    it('returns empty array if history is empty', async () => {
      await testClearRepository(connection, HistoryEntity);
      const emptyHistory = await historyService.findAll();

      expect(emptyHistory.total).toBe(0);
      expect(emptyHistory.data).toStrictEqual([]);
    });

    it('returns full history from database', async () => {
      await testClearRepository(connection, HistoryEntity);

      await testCreateHistoryRecord(connection, HistoryEvent.TurnedOn);
      await testCreateHistoryRecord(connection, HistoryEvent.Open);
      await testCreateHistoryRecord(connection, HistoryEvent.Open);

      const fullHistory = await historyService.findAll();
      expect(fullHistory.total).toBe(3);
    });
  });

  describe('findAllByUserId()', () => {
    it('returns empty array if user history is empty', async () => {
      await testClearRepository(connection, HistoryEntity);
      const testUser = await testCreateRandomUser(connection);

      await testCreateHistoryRecord(connection, HistoryEvent.TurnedOn);
      await testCreateHistoryRecord(connection, HistoryEvent.Open);
      await testCreateHistoryRecord(connection, HistoryEvent.Open);

      const emptyHistory = await historyService.findAllByUserId(testUser.id);

      expect(emptyHistory.total).toBe(0);
    });

    it('returns user history', async () => {
      await testClearRepository(connection, HistoryEntity);
      const testUser = await testCreateRandomUser(connection);

      await testCreateHistoryRecord(connection, HistoryEvent.TurnedOn);
      await testCreateHistoryRecord(connection, HistoryEvent.Open);
      await testCreateHistoryRecord(connection, HistoryEvent.Open, testUser);
      await testCreateHistoryRecord(connection, HistoryEvent.Open, testUser);

      const userHistory = await historyService.findAllByUserId(testUser.id);

      expect(userHistory.total).toBe(2);
    });
  });

  describe('create()', () => {
    it('properly creates new history user record', async () => {
      await testClearRepository(connection, UserEntity);
      const randomUser = await testCreateRandomUser(connection);
      const historyUserRecord: CreateHistoryUserEventDto = {
        event: HistoryEvent.Open,
        user: randomUser,
      };

      const createdUserRecord = await historyService.create(historyUserRecord);

      expect(createdUserRecord.event).toEqual(HistoryEvent.Open);
      expect(createdUserRecord.user).toEqual(randomUser);
    });

    it('properly creates new history device record', async () => {
      await testClearRepository(connection, UserEntity);

      const historyDeviceRecord: CreateHistoryDeviceEventDto = {
        event: HistoryEvent.TurnedOn,
      };

      const createdDeviceRecord = await historyService.create(historyDeviceRecord);

      expect(createdDeviceRecord.event).toEqual(HistoryEvent.TurnedOn);
      expect(createdDeviceRecord.user).toBeUndefined();
    });
  });

  describe('remove()', () => {
    it('rejects with Exception when history event has wrong id', async () => {
      const repository = await testClearRepository(connection, HistoryEntity);
      await testCreateHistoryRecord(connection, HistoryEvent.TurnedOn);

      await expect(repository.count()).resolves.toBe(1);
      await expect(historyService.remove('INVALID_ID')).rejects.toBeInstanceOf(QueryFailedError);
    });

    it('returns true and remove user', async () => {
      const repository = await testClearRepository(connection, HistoryEntity);
      const firstHistoryRecord = await testCreateHistoryRecord(connection, HistoryEvent.TurnedOn);
      const secondHistoryRecord = await testCreateHistoryRecord(connection, HistoryEvent.TurnedOn);

      await expect(repository.find()).resolves.toStrictEqual([
        firstHistoryRecord,
        secondHistoryRecord,
      ]);
      await expect(historyService.remove(firstHistoryRecord.id)).resolves.toBe(true);
      await expect(repository.find()).resolves.toStrictEqual([secondHistoryRecord]);
      await expect(repository.findOne({ id: firstHistoryRecord.id })).resolves.toBeUndefined();
    });
  });

  describe('removeMany()', () => {
    it('rejects with Exception when user has wrong id', async () => {
      const repository = await testClearRepository(connection, HistoryEntity);
      await testCreateHistoryRecord(connection, HistoryEvent.TurnedOn);

      await expect(repository.count()).resolves.toBe(1);
      await expect(historyService.removeMany({ ids: ['INVALID_ID'] })).rejects.toBeInstanceOf(
        BadRequestException,
      );
    });

    it('removes many users', async () => {
      const repository = await testClearRepository(connection, HistoryEntity);
      const firstHistoryRecord = await testCreateHistoryRecord(connection, HistoryEvent.TurnedOn);
      const secondHistoryRecord = await testCreateHistoryRecord(connection, HistoryEvent.TurnedOn);

      await expect(repository.find()).resolves.toStrictEqual([
        firstHistoryRecord,
        secondHistoryRecord,
      ]);
      await expect(
        historyService.removeMany({ ids: [firstHistoryRecord.id] }),
      ).resolves.toBeUndefined();
      await expect(repository.find()).resolves.toStrictEqual([secondHistoryRecord]);
      await expect(repository.findOne({ id: firstHistoryRecord.id })).resolves.toBeUndefined();
    });
  });
});

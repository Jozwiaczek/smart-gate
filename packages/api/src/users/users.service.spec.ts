import { NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { Connection } from 'typeorm';

import { clearTestDatabase } from '../../test/utils/clearTestDatabase';
import { testCreateRandomUser } from '../../test/utils/testCreateRandomUser';
import { DatabaseModule } from '../database/database.module';
import { UserEntity } from '../database/entities/user.entity';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let connection: Connection;
  let usersService: UsersService;

  beforeEach(async () => {
    await clearTestDatabase();

    const testingModule = await Test.createTestingModule({
      imports: [DatabaseModule],
      providers: [UsersService],
    }).compile();

    connection = testingModule.get(Connection);
    usersService = testingModule.get(UsersService);
  });

  afterEach(async () => {
    await connection.close();
  });

  describe('findOne()', () => {
    it('rejects with NotFoundException when user is not found', async () => {
      expect.assertions(2);
      const repository = connection.getRepository(UserEntity);
      await repository.delete({});
      expect(await repository.count()).toStrictEqual(0);
      await expect(async () =>
        usersService.findOne('3c3b2ebb-9daa-4f42-85b2-eecc213ca86e'),
      ).rejects.toBeInstanceOf(NotFoundException);
    });

    it('returns user with requested id', async () => {
      expect.assertions(3);
      const repository = connection.getRepository(UserEntity);
      await repository.delete({});
      expect(await repository.count()).toStrictEqual(0);
      const userEntity = await testCreateRandomUser(connection);
      expect(await repository.count()).toStrictEqual(1);
      const selectedUserEntity = await usersService.findOne(userEntity.id);
      expect(userEntity).toStrictEqual(selectedUserEntity);
    });
  });

  describe('findOneByEmail()', () => {
    it('rejects with NotFoundException when user is not found', async () => {
      expect.assertions(2);
      const repository = connection.getRepository(UserEntity);
      await repository.delete({});
      expect(await repository.count()).toStrictEqual(0);
      await expect(async () =>
        usersService.findOneByEmail('some@email.com'),
      ).rejects.toBeInstanceOf(NotFoundException);
    });

    it('returns valid userEntity when user is found', async () => {
      expect.assertions(3);
      const repository = connection.getRepository(UserEntity);
      await repository.delete({});
      expect(await repository.count()).toStrictEqual(0);
      const userEntity = await testCreateRandomUser(connection);
      expect(await repository.count()).toStrictEqual(1);
      const selectedUserEntity = await usersService.findOneByEmail('some@email.com');
      expect(userEntity).toStrictEqual(selectedUserEntity);
    });
  });
});

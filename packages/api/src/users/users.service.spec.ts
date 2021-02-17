import { NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { Connection, QueryFailedError } from 'typeorm';

import { clearTestDatabase } from '../../test/utils/clearTestDatabase';
import { testCreateRandomUser } from '../../test/utils/testCreateRandomUser';
import { Role } from '../auth/role.enum';
import { DatabaseModule } from '../database/database.module';
import { UserEntity } from '../database/entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

const setupRepository = async (connection: Connection) => {
  const repository = connection.getRepository(UserEntity);
  await repository.delete({});
  expect(await repository.count()).toStrictEqual(0);
};

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

  describe('findAll()', () => {
    it('returns empty array if no users', async () => {
      await setupRepository(connection);
      const allUsers = await usersService.findAll();

      expect(allUsers.total).toStrictEqual(0);
      expect(allUsers.data).toStrictEqual([]);
    });

    it('returns user from database', async () => {
      const repository = connection.getRepository(UserEntity);
      await repository.delete({});
      expect(await repository.count()).toStrictEqual(0);
      const arr = [];
      for (let i = 0; i < 10; i += 1) {
        arr.push(testCreateRandomUser(connection));
      }
      const users = await Promise.all(arr);
      expect(await repository.count()).toStrictEqual(10);
      const result = await usersService.findAll();
      expect(result.total).toEqual(10);
      expect(result.data).toEqual(expect.arrayContaining(users));
    });
  });

  describe('findOne()', () => {
    it('rejects with NotFoundException when user is not found', async () => {
      const repository = connection.getRepository(UserEntity);
      await repository.delete({});
      expect(await repository.count()).toStrictEqual(0);
      await expect(
        usersService.findOne('3c3b2ebb-9daa-4f42-85b2-eecc213ca86e'),
      ).rejects.toBeInstanceOf(NotFoundException);
    });

    it('returns user with requested id', async () => {
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
      const repository = connection.getRepository(UserEntity);
      await repository.delete({});
      expect(await repository.count()).toStrictEqual(0);
      await expect(usersService.findOneByEmail('some@email.com')).rejects.toBeInstanceOf(
        NotFoundException,
      );
    });

    it('returns valid userEntity when user is found', async () => {
      const repository = connection.getRepository(UserEntity);
      await repository.delete({});
      expect(await repository.count()).toStrictEqual(0);
      const userEntity: UserEntity = new UserEntity();
      userEntity.email = 'some@email.com';
      userEntity.password = 'some_password';
      await repository.save(userEntity);
      expect(await repository.count()).toStrictEqual(1);
      const selectedUserEntity = await usersService.findOneByEmail('some@email.com');
      expect(userEntity).toStrictEqual(selectedUserEntity);
    });
  });

  describe('create()', () => {
    it('rejects with Exception when user with the same email already exists', async () => {
      const repository = connection.getRepository(UserEntity);
      await repository.delete({});
      expect(await repository.count()).toStrictEqual(0);
      const randomUser = await testCreateRandomUser(connection);
      expect(await repository.count()).toStrictEqual(1);
      const user: CreateUserDto = {
        email: randomUser.email,
        password: 'test',
        firstName: 'test',
        lastName: 'test',
        roles: [],
      };
      await expect(usersService.create(user)).rejects.toBeInstanceOf(QueryFailedError);
    });

    it('returns valid created user', async () => {
      const repository = connection.getRepository(UserEntity);
      await repository.delete({});
      expect(await repository.count()).toStrictEqual(0);
      const user: CreateUserDto = {
        email: 'smart@gate.com',
        password: 'test',
        firstName: 'test',
        lastName: 'test',
        roles: [Role.User],
      };
      await expect(usersService.create(user)).resolves.toEqual(expect.objectContaining(user));
    });
  });

  describe('update()', () => {
    it('rejects with NotFoundException when user has wrong id', async () => {
      const repository = connection.getRepository(UserEntity);
      await repository.delete({});
      expect(await repository.count()).toStrictEqual(0);
      const randomUser = await testCreateRandomUser(connection);
      expect(await repository.count()).toStrictEqual(1);
      const user: UpdateUserDto = {
        email: randomUser.email,
      };
      await expect(usersService.update(`${Date.now()}`, user)).rejects.toBeInstanceOf(
        NotFoundException,
      );
    });

    it('returns valid updated user firstname and lastname', async () => {
      const repository = connection.getRepository(UserEntity);
      await repository.delete({});
      expect(await repository.count()).toStrictEqual(0);
      const user: CreateUserDto = {
        email: 'smart@gate.com',
        password: 'test',
        firstName: 'test',
        lastName: 'test',
        roles: [Role.User],
      };
      const newUser = await usersService.create(user);
      expect(await repository.count()).toStrictEqual(1);
      const noChanges = {};
      await expect(usersService.update(newUser.id, noChanges)).resolves.toEqual(
        expect.objectContaining(newUser),
      );
      const nameChange: UpdateUserDto = {
        firstName: `${Date.now()}`,
        lastName: `${Date.now()}`,
      };
      await expect(usersService.update(newUser.id, nameChange)).resolves.toEqual(
        expect.objectContaining({ ...newUser, ...nameChange }),
      );
    });
  });

  describe('remove()', () => {
    it('rejects with Exception when user has wrong id', async () => {
      const repository = connection.getRepository(UserEntity);
      await repository.delete({});
      expect(await repository.count()).toStrictEqual(0);
      await testCreateRandomUser(connection);
      expect(await repository.count()).toStrictEqual(1);
      await expect(usersService.remove(`${Date.now()}`)).rejects.toBeInstanceOf(QueryFailedError);
    });

    it('returns true and remove user', async () => {
      const repository = connection.getRepository(UserEntity);
      await repository.delete({});
      expect(await repository.count()).toStrictEqual(0);
      const user = await testCreateRandomUser(connection);
      await testCreateRandomUser(connection);
      expect(await repository.count()).toStrictEqual(2);
      expect(await usersService.remove(user.id)).toStrictEqual(true);
      expect(await repository.count()).toStrictEqual(1);
      expect(await repository.findOne({ id: user.id })).toStrictEqual(undefined);
    });
  });
});

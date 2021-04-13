import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import * as Sentry from '@sentry/node';
import { Connection } from 'typeorm';

import { GetList } from '../../interfaces/react-admin-types';
import { UserEntity } from '../database/entities/user.entity';
import { UserRepository } from '../repository/user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { DeleteUsersDto } from './dto/delete-users.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly connection: Connection,
    private readonly userRepository: UserRepository,
  ) {}

  private readonly repository = this.connection.getRepository(UserEntity);

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    return this.repository.save(createUserDto);
  }

  async findAll(): Promise<GetList<UserEntity>> {
    const allUsers = await this.repository.find();
    return { data: allUsers, total: allUsers.length };
  }

  async findOne(id: string): Promise<UserEntity> {
    return this.repository.findOneOrFail({ id }).catch(() => {
      throw new NotFoundException(`User with id: ${id} not found`);
    });
  }

  async findOneByEmail(email: string): Promise<UserEntity> {
    return this.repository.findOneOrFail({ email }).catch(() => {
      throw new NotFoundException(`User with email: ${email} not found`);
    });
  }

  async updatePassword(email: string, hashPassword: string): Promise<UserEntity> {
    const user = await this.findOneByEmail(email);
    user.password = hashPassword;

    return this.repository.save(user);
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<UserEntity | undefined> {
    const foundUser = await this.findOne(id);

    if (!foundUser) {
      throw new NotFoundException(`User with id: ${id} not found`);
    }

    if (updateUserDto.firstName !== undefined) foundUser.firstName = updateUserDto.firstName;
    if (updateUserDto.lastName !== undefined) foundUser.lastName = updateUserDto.lastName;

    await this.repository.save(foundUser);
    return foundUser;
  }

  async remove(id: string): Promise<true> {
    await this.connection
      .createQueryBuilder()
      .delete()
      .from(UserEntity)
      .where('id = :id', { id })
      .execute();

    return true;
  }

  async removeMany(deleteUsersDto: DeleteUsersDto): Promise<void> {
    try {
      await this.userRepository.deleteManyById(deleteUsersDto.ids);
    } catch (err) {
      Sentry.captureException(err);
      throw new BadRequestException('Invalid ids list');
    }
  }
}

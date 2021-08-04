import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import * as Sentry from '@sentry/node';

import { GetList } from '../../interfaces/react-admin-types';
import { UserEntity } from '../database/entities/user.entity';
import { UserRepository } from '../repository/user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { DeleteUsersDto } from './dto/delete-users.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    return this.userRepository.create(createUserDto);
  }

  async findAll(): Promise<GetList<UserEntity>> {
    const allUsers = await this.userRepository.find();
    return { data: allUsers, total: allUsers.length };
  }

  async findOne(id: string): Promise<UserEntity> {
    return this.userRepository.findByIdOrFail(id).catch(() => {
      throw new NotFoundException(`User with id: ${id} not found`);
    });
  }

  async findOneByEmail(email: string): Promise<UserEntity> {
    return this.userRepository.findOneByEmailOrFail(email);
  }

  async updateExternalIntegrationsToken(email: string, newToken: string): Promise<UserEntity> {
    try {
      const foundUser = await this.findOneByEmail(email);

      if (newToken !== undefined) {
        foundUser.externalIntegrationsToken = newToken;
      }

      await this.userRepository.update(foundUser.id, foundUser);
      return foundUser;
    } catch (error) {
      throw new NotFoundException(`User with email: ${email} not found`);
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<UserEntity | undefined> {
    const foundUser = await this.findOne(id);

    if (!foundUser) {
      throw new NotFoundException(`User with id: ${id} not found`);
    }

    if (updateUserDto.firstName !== undefined) foundUser.firstName = updateUserDto.firstName;
    if (updateUserDto.lastName !== undefined) foundUser.lastName = updateUserDto.lastName;

    await this.userRepository.update(foundUser.id, foundUser);
    return foundUser;
  }

  async remove(id: string): Promise<true> {
    await this.userRepository.deleteById(id);
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

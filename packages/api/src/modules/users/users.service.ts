import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import * as Sentry from '@sentry/node';

import { GetList } from '../../interfaces/react-admin-types';
import getPaginationOptions from '../../utils/getPaginationOptions';
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

  async findAll(query?: FindQuery): Promise<GetList<UserEntity>> {
    const [allUsers, allUsersTotal] = await this.userRepository.findAndCount({
      ...getPaginationOptions(query),
      order: { createdAt: 'DESC' },
    });

    return { data: allUsers, total: allUsersTotal };
  }

  async findOne(id: string): Promise<UserEntity> {
    return this.userRepository.findByIdOrFail(id).catch(() => {
      throw new NotFoundException(`User with id: ${id} not found`);
    });
  }

  async findOneByEmail(email: string): Promise<UserEntity> {
    return this.userRepository.findOneByEmailOrFail(email);
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<UserEntity> {
    const foundUser = await this.findOne(id);

    if (!foundUser) {
      throw new NotFoundException(`User with id: ${id} not found`);
    }

    if (updateUserDto.firstName !== undefined) {
      foundUser.firstName = updateUserDto.firstName;
    }
    if (updateUserDto.lastName !== undefined) {
      foundUser.lastName = updateUserDto.lastName;
    }
    if (updateUserDto.externalIntegrationsToken !== undefined) {
      foundUser.externalIntegrationsToken = updateUserDto.externalIntegrationsToken;
    }

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

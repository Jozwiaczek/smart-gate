import { Injectable, NotFoundException } from '@nestjs/common';
import { Connection } from 'typeorm';
import { UserEntity } from '../database/entities/user.entity';
import { UserRequestType } from './user-request.type';

@Injectable()
export class UserService {
  constructor(private readonly connection: Connection) {}

  async getUserById(userId: string): Promise<UserEntity | undefined> {
    const foundUser = this.connection.getRepository(UserEntity).findOne({
      id: userId,
    });

    if (!foundUser) {
      throw new NotFoundException(`User with id: ${userId} not found`);
    }

    return foundUser;
  }

  async getUsers(): Promise<Array<UserEntity>> {
    return this.connection.getRepository(UserEntity).find();
  }

  async create(user: UserRequestType): Promise<UserEntity> {
    return this.connection.getRepository(UserEntity).save(user);
  }

  async getByEmail(email: string): Promise<UserEntity | undefined> {
    const foundUser = this.connection.getRepository(UserEntity).findOne({ email });

    if (!foundUser) {
      throw new NotFoundException(`User with email=${email} not found`);
    }

    return foundUser;
  }
}

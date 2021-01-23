import { Injectable, NotFoundException } from '@nestjs/common';
import { Connection } from 'typeorm';
import { UserEntity } from '../database/entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly connection: Connection) {}

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    return this.connection.getRepository(UserEntity).save(createUserDto);
  }

  async findAll(): Promise<Array<UserEntity>> {
    return this.connection.getRepository(UserEntity).find();
  }

  async findOne(id: string): Promise<UserEntity | undefined> {
    const foundUser = await this.connection.getRepository(UserEntity).findOne({ id });

    if (!foundUser) {
      throw new NotFoundException(`User with id: ${id} not found`);
    }

    return foundUser;
  }

  async findOneByEmail(email: string): Promise<UserEntity | undefined> {
    const foundUser = await this.connection.getRepository(UserEntity).findOne({ email });

    if (!foundUser) {
      throw new NotFoundException(`User with email: ${email} not found`);
    }

    return foundUser;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<UserEntity | undefined> {
    const foundUser = await this.findOne(id);

    if (!foundUser) {
      throw new NotFoundException(`User with id: ${id} not found`);
    }

    if (updateUserDto.firstName !== undefined) foundUser.firstName = updateUserDto.firstName;
    if (updateUserDto.lastName !== undefined) foundUser.lastName = updateUserDto.lastName;

    await this.connection.getRepository(UserEntity).save(foundUser);
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
}

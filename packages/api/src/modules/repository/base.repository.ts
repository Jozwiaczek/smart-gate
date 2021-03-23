import { Type } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, DeleteResult, FindManyOptions, FindOneOptions, Repository } from 'typeorm';

import { BaseEntity } from '../database/entities/base.entity';

export interface BaseRepositoryType<T> {
  readonly repository: Repository<T>;

  create: (dataToCreate: DeepPartial<T>) => Promise<T>;

  findById: (id: string) => Promise<T | undefined>;
  findByIdOrFail: (id: string) => Promise<T>;

  findOne: (options: FindOneOptions<T>) => Promise<T | undefined>;
  findOneOrFail: (options: FindOneOptions<T>) => Promise<T>;

  find: (options: FindManyOptions<T>) => Promise<T[]>;

  update: (id: string, dataToUpdate: DeepPartial<T>) => Promise<T>;

  deleteById: (id: string) => Promise<DeleteResult>;

  count: () => Promise<number>;
}

type Constructor<T> = new (...args: never[]) => T;

export function BaseRepository<T extends BaseEntity>(
  entityType: Constructor<T>,
): Type<BaseRepositoryType<T>> {
  class BaseRepositoryHost implements BaseRepositoryType<T> {
    @InjectRepository(entityType)
    public readonly repository: Repository<T>;

    async create(dataToCreate: DeepPartial<T>): Promise<T> {
      try {
        return this.repository.save(dataToCreate);
      } catch (err) {
        throw new Error(`Cannot create entity with data ${dataToCreate}`);
      }
    }

    async findById(id: string): Promise<T | undefined> {
      return this.repository.findOne({ where: { id } });
    }

    async findByIdOrFail(id: string): Promise<T> {
      try {
        return this.repository.findOneOrFail({ where: { id } });
      } catch (err) {
        throw new Error(`Entity with id: '${id}' dose not exists!`);
      }
    }

    async findOne(options: FindOneOptions): Promise<T | undefined> {
      return this.repository.findOne(options);
    }

    async findOneOrFail(options: FindOneOptions): Promise<T> {
      return this.repository.findOneOrFail(options);
    }

    async find(options: FindManyOptions): Promise<T[]> {
      return this.repository.find(options);
    }

    async update(id: string, dataToUpdate: DeepPartial<T>): Promise<T> {
      const entityToUpdate: DeepPartial<T> = {
        id,
        ...dataToUpdate,
        updatedAt: new Date(),
      };
      try {
        return await this.repository.save(entityToUpdate);
      } catch (err) {
        throw new Error(
          `Entity with id: '${id}' cannot be updated with data: '${JSON.stringify(
            entityToUpdate,
          )}'`,
        );
      }
    }

    async deleteById(id: string): Promise<DeleteResult> {
      return this.repository.delete(id);
    }

    count(): Promise<number> {
      return this.repository.count();
    }
  }

  return BaseRepositoryHost;
}
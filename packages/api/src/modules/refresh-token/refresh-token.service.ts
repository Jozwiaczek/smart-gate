import { Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { TokenExpiredError } from 'jsonwebtoken';
import { Connection, LessThan } from 'typeorm';

import { RefreshTokenEntity } from '../database/entities/refreshToken.entity';
import { UserEntity } from '../database/entities/user.entity';

@Injectable()
export class RefreshTokenService {
  constructor(private readonly connection: Connection) {}

  repository = this.connection.getRepository(RefreshTokenEntity);

  async create(user: UserEntity, keepMeLoggedIn: boolean, expirationDate: Date): Promise<string> {
    await this.beforeCreate();
    const entity = {
      user,
      expirationDate,
      keepMeLoggedIn,
    };
    const refreshTokenEntity = await this.repository.save(entity);
    const salt = bcrypt.genSaltSync();
    return bcrypt.hash(refreshTokenEntity.id, salt);
  }

  async find(refreshTokenHash: string, userId: string): Promise<RefreshTokenEntity> {
    const tokenEntities = await this.repository.find({ user: { id: userId } });
    const tokenEntity = tokenEntities.find(({ id }) => bcrypt.compareSync(id, refreshTokenHash));

    if (!tokenEntity) {
      throw new NotFoundException('Token not found');
    }

    const { expirationDate } = tokenEntity;
    if (expirationDate.getTime() < Date.now()) {
      throw new TokenExpiredError('Token expired', expirationDate);
    }

    return tokenEntity;
  }

  async delete(refreshTokenHash: string, userId: string): Promise<RefreshTokenEntity> {
    const token = await this.find(refreshTokenHash, userId);
    return await this.repository.remove(token);
  }

  private async beforeCreate() {
    const entities = await this.connection
      .getRepository(RefreshTokenEntity)
      .find({ expirationDate: LessThan(new Date()) });
    await this.connection.getRepository(RefreshTokenEntity).remove(entities);
  }
}

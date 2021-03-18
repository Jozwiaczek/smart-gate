import { Injectable, NotFoundException } from '@nestjs/common';
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
      userId: user.id,
      expirationDate,
      keepMeLoggedIn,
    };
    const refreshTokenEntity = await this.repository.save(entity);
    return refreshTokenEntity.id;
  }

  async find(refreshTokenId: string, userId: string): Promise<RefreshTokenEntity> {
    const tokenEntity = await this.repository
      .findOneOrFail({ where: { id: refreshTokenId, userId } })
      .catch(() => {
        throw new NotFoundException('Token not found');
      });

    const { expirationDate } = tokenEntity;
    if (expirationDate.getTime() < Date.now()) {
      throw new TokenExpiredError('Token expired', expirationDate);
    }
    return tokenEntity;
  }

  async delete(refreshTokenId: string, userId: string): Promise<RefreshTokenEntity> {
    const token = await this.find(refreshTokenId, userId);
    return this.repository.remove(token);
  }

  async deleteAllForUser(userId: string): Promise<RefreshTokenEntity[]> {
    const tokens = await this.repository.find({ where: { userId } });
    return this.repository.remove(tokens);
  }

  private async beforeCreate() {
    const entities = await this.connection
      .getRepository(RefreshTokenEntity)
      .find({ expirationDate: LessThan(new Date()) });
    await this.connection.getRepository(RefreshTokenEntity).remove(entities);
  }
}

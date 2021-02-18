import { Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import jsonwebtoken from 'jsonwebtoken';
import { Connection, LessThan } from 'typeorm';

import { TokenPayload } from '../../interfaces/token-types';
import { RefreshTokenEntity } from '../database/entities/refreshToken.entity';
import { UserEntity } from '../database/entities/user.entity';

@Injectable()
export class RefreshTokenService {
  constructor(private readonly connection: Connection) {}

  async create(token: string, user: UserEntity, expirationDate: Date): Promise<RefreshTokenEntity> {
    await this.beforeCreate();
    const salt = await bcrypt.genSalt();
    const hashToken = await bcrypt.hash(token, salt);
    const entity = {
      user,
      token: hashToken,
      expirationDate,
    };
    return this.connection.getRepository(RefreshTokenEntity).save(entity);
  }

  async find(refreshToken: string, user: UserEntity): Promise<RefreshTokenEntity> {
    const { REFRESH_SECRET } = process.env;
    if (!REFRESH_SECRET) {
      throw new Error('Refresh secret not set');
    }
    const { exp } = jsonwebtoken.verify(refreshToken, REFRESH_SECRET) as TokenPayload;
    if (!exp) {
      throw new Error('Incorrect expiration date');
    }
    const refreshTokens = await this.connection
      .getRepository(RefreshTokenEntity)
      .find({ user, expirationDate: new Date(exp * 1000) });

    const tokenEntity = refreshTokens.find(({ token }) => bcrypt.compareSync(refreshToken, token));
    if (!tokenEntity) {
      throw new NotFoundException('Token not found');
    }
    return tokenEntity;
  }

  async delete(refreshToken: string, user: UserEntity): Promise<RefreshTokenEntity> {
    const token = await this.find(refreshToken, user);
    return this.connection.getRepository(RefreshTokenEntity).remove(token);
  }

  private async beforeCreate() {
    const entities = await this.connection
      .getRepository(RefreshTokenEntity)
      .find({ expirationDate: LessThan(new Date()) });
    await this.connection.getRepository(RefreshTokenEntity).remove(entities);
  }
}

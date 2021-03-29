import { RefreshTokenEntity } from '../database/entities/refreshToken.entity';
import { BaseRepository } from './base.repository';

export class RefreshTokenRepository extends BaseRepository(RefreshTokenEntity) {
  async findOneWithUserIdOrFail(id: string, userId: string): Promise<RefreshTokenEntity> {
    return this.repository.findOneOrFail({
      where: {
        id,
        userId,
      },
    });
  }

  async deleteAllWithUserId(userId: string): Promise<RefreshTokenEntity[]> {
    const entitiesToDelete = await this.find({
      where: {
        userId,
      },
    });

    return this.repository.remove(entitiesToDelete);
  }
}

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
}

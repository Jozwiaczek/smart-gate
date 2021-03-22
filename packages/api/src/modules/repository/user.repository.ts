import { UserEntity } from '../database/entities/user.entity';
import { BaseRepository } from './base.repository';

export class UserRepository extends BaseRepository(UserEntity) {
  async findOneByEmail(email: string): Promise<UserEntity | undefined> {
    return this.findOne({ where: { email } });
  }

  async findOneByEmailOrFail(email: string): Promise<UserEntity> {
    return this.findOneOrFail({ where: { email } });
  }

  async updatePassword(email: string, hashPassword: string): Promise<UserEntity> {
    const { id } = await this.findOneByEmailOrFail(email);
    return this.update(id, { password: hashPassword });
  }
}

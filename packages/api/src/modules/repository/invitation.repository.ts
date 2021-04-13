import { InvitationEntity } from '../database/entities/invitation.entity';
import { BaseRepository } from './base.repository';

export class InvitationRepository extends BaseRepository(InvitationEntity) {
  async findWithCredentialsOrFail(email: string, code: string): Promise<InvitationEntity> {
    return this.findOneOrFail({ where: { email, id: code } });
  }
}

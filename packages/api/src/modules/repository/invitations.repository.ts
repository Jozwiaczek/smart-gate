import { LessThan } from 'typeorm';

import { InvitationEntity } from '../database/entities/invitation.entity';
import { BaseRepository } from './base.repository';

export class InvitationsRepository extends BaseRepository(InvitationEntity) {
  async clean(): Promise<InvitationEntity[]> {
    const oldInvitations = await this.find({
      where: {
        expirationDate: LessThan(new Date()),
      },
    });
    return this.repository.remove(oldInvitations);
  }

  async findWithCredentialsOrFail(email: string, code: string): Promise<InvitationEntity> {
    return this.findOneOrFail({ where: { email, id: code } });
  }
}

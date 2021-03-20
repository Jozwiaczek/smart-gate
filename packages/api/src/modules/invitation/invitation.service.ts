import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';

import { Role } from '../auth/role.enum';
import { InvitationEntity } from '../database/entities/invitation.entity';
import { MailerService } from '../mailer/mailer.service';

@Injectable()
export class InvitationService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly connection: Connection,
  ) {}

  private repository = this.connection.getRepository(InvitationEntity);

  async create(email: string, roles?: Array<Role>): Promise<InvitationEntity> {
    return this.repository.save({
      email,
      expirationDate: new Date(Date.now() + 1000 * 60 * 30),
      roles,
    });
  }

  async findOneOrFail(id: string, email: string): Promise<InvitationEntity> {
    return this.repository.findOneOrFail({ where: { id, email } });
  }
}

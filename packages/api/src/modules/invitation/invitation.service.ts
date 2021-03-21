import { Injectable } from '@nestjs/common';

import { urlEncodedParams } from '../../utils';
import { Role } from '../auth/role.enum';
import { MailerService } from '../mailer/mailer.service';
import { InvitationRepository } from '../repository/invitation.repository';
import { UserRepository } from '../repository/user.repository';
import { InvitationConfigService } from './Config/invitation-config.service';

@Injectable()
export class InvitationService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly invitationRepository: InvitationRepository,
    private readonly userRepository: UserRepository,
    private readonly invitationConfigService: InvitationConfigService,
  ) {}

  async send(email: string, roles?: Array<Role>): Promise<void> {
    const user = await this.userRepository.findOneByEmail(email);
    if (user) {
      throw new Error(`Cannot send invitation because user with email: '${email}' exists.`);
    }
    const { id: invitationId } = await this.invitationRepository.create({ email, roles });

    const link = urlEncodedParams(
      this.invitationConfigService.getBaseMagicLinkUrl(),
      email,
      invitationId,
    );

    await this.mailerService.sendInvitation(email, link);
  }
}

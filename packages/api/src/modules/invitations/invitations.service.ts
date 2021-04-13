import { Injectable } from '@nestjs/common';

import { urlEncodedParams } from '../../utils';
import { MailerService } from '../mailer/mailer.service';
import { InvitationsRepository } from '../repository/invitations.repository';
import { UsersRepository } from '../repository/users.repository';
import { InvitationsConfigService } from './Config/invitations-config.service';
import { CreateInvitationDto } from './dto/create-invitation.dto';

@Injectable()
export class InvitationsService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly invitationConfigService: InvitationsConfigService,
    private readonly invitationRepository: InvitationsRepository,
    private readonly userRepository: UsersRepository,
  ) {}

  async send({ email, roles }: CreateInvitationDto): Promise<void> {
    const user = await this.userRepository.findOneByEmail(email);
    if (user) {
      throw new Error(
        `Cannot send invitation because user with email: '${email}' already exists in database.`,
      );
    }

    const expirationDate = this.invitationConfigService.getExpirationDate();

    await this.invitationRepository.clean();

    const { id: invitationId } = await this.invitationRepository.create({
      email,
      roles,
      expirationDate,
    });

    const link = urlEncodedParams(
      this.invitationConfigService.getBaseMagicLinkUrl(),
      email,
      invitationId,
    );

    await this.mailerService.sendInvitation(email, link);
  }
}

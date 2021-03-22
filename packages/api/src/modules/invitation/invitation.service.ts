import { Injectable } from '@nestjs/common';

import { urlEncodedParams } from '../../utils';
import { MailerService } from '../mailer/mailer.service';
import { InvitationRepository } from '../repository/invitation.repository';
import { UserRepository } from '../repository/user.repository';
import { InvitationConfigService } from './Config/invitation-config.service';
import { CreateInvitationDto } from './dto/create-invitation.dto';

@Injectable()
export class InvitationService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly invitationRepository: InvitationRepository,
    private readonly userRepository: UserRepository,
    private readonly invitationConfigService: InvitationConfigService,
  ) {}

  async send({ email, roles }: CreateInvitationDto): Promise<void> {
    const user = await this.userRepository.findOneByEmail(email);
    if (user) {
      throw new Error(
        `Cannot send invitation because user with email: '${email}' already exists in database.`,
      );
    }

    const expirationDate = this.invitationConfigService.getExpirationDate();

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

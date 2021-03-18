import { Module } from '@nestjs/common';

import { MailerModule } from '../mailer/mailer.module';
import { InvitationService } from './invitation.service';

@Module({
  imports: [MailerModule],
  providers: [InvitationService],
  exports: [InvitationService],
})
export class InvitationModule {}

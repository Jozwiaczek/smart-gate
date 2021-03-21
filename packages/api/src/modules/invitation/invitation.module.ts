import { Module } from '@nestjs/common';

import { MailerModule } from '../mailer/mailer.module';
import { RepositoryModule } from '../repository/repository.module';
import { InvitationConfigModule } from './Config/invitation-config.module';
import { InvitationService } from './invitation.service';

@Module({
  imports: [MailerModule, RepositoryModule, InvitationConfigModule],
  providers: [InvitationService],
  exports: [InvitationService],
})
export class InvitationModule {}

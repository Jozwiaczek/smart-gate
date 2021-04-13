import { Module } from '@nestjs/common';

import { AuthModule } from '../auth/auth.module';
import { TokenModule } from '../auth/token/token.module';
import { MailerModule } from '../mailer/mailer.module';
import { RepositoryModule } from '../repository/repository.module';
import { InvitationsConfigModule } from './Config/invitations-config.module';
import { InvitationsController } from './invitations.controller';
import { InvitationsService } from './invitations.service';

@Module({
  imports: [MailerModule, RepositoryModule, InvitationsConfigModule, AuthModule, TokenModule],
  providers: [InvitationsService],
  exports: [InvitationsService],
  controllers: [InvitationsController],
})
export class InvitationsModule {}

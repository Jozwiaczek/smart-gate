import { Module } from '@nestjs/common';

import { AuthModule } from '../auth/auth.module';
import { TokenModule } from '../auth/token/token.module';
import { MailerModule } from '../mailer/mailer.module';
import { RepositoryModule } from '../repository/repository.module';
import { InvitationConfigModule } from './Config/invitation-config.module';
import { InvitationController } from './invitation.controller';
import { InvitationService } from './invitation.service';

@Module({
  imports: [MailerModule, RepositoryModule, InvitationConfigModule, AuthModule, TokenModule],
  providers: [InvitationService],
  exports: [InvitationService],
  controllers: [InvitationController],
})
export class InvitationModule {}

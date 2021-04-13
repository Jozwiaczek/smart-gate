import { Module } from '@nestjs/common';

import { ConfigModule } from '../../config/config.module';
import { InvitationsConfigService } from './invitations-config.service';

@Module({
  imports: [ConfigModule],
  providers: [InvitationsConfigService],
  exports: [InvitationsConfigService],
})
export class InvitationsConfigModule {}

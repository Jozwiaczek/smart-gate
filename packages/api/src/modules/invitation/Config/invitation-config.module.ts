import { Module } from '@nestjs/common';

import { ConfigModule } from '../../config/config.module';
import { InvitationConfigService } from './invitation-config.service';

@Module({
  providers: [InvitationConfigService, ConfigModule],
  exports: [InvitationConfigService],
})
export class InvitationConfigModule {}

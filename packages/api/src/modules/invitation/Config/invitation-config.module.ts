import { Module } from '@nestjs/common';

import { ConfigModule } from '../../config/config.module';
import { InvitationConfigService } from './invitation-config.service';

@Module({
  imports: [ConfigModule],
  providers: [InvitationConfigService],
  exports: [InvitationConfigService],
})
export class InvitationConfigModule {}

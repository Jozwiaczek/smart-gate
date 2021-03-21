import { Module } from '@nestjs/common';

import { InvitationConfigService } from './invitation-config.service';

@Module({
  providers: [InvitationConfigService],
  exports: [InvitationConfigService],
})
export class InvitationConfigModule {}

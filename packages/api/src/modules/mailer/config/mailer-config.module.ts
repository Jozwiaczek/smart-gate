import { Module } from '@nestjs/common';

import { MailerConfigService } from './mailer-config.service';

@Module({
  imports: [],
  providers: [MailerConfigService],
  exports: [MailerConfigService],
})
export class MailerConfigModule {}

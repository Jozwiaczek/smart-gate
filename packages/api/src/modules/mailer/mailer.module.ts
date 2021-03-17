import { Module } from '@nestjs/common';

import { MailerConfigModule } from './config/mailer-config.module';
import { MailerService } from './mailer.service';

@Module({
  imports: [MailerConfigModule],
  providers: [MailerService],
  exports: [MailerService],
})
export class MailerModule {}

import { Module } from '@nestjs/common';

import { ConfigModule } from '../config/config.module';
import { MailerConfigModule } from './config/mailer-config.module';
import { MailerService } from './mailer.service';

@Module({
  imports: [MailerConfigModule, ConfigModule],
  providers: [MailerService],
  exports: [MailerService],
})
export class MailerModule {}

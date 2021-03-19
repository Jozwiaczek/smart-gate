import { Module } from '@nestjs/common';

import { ConfigModule } from '../../config/config.module';
import { MailerConfigService } from './mailer-config.service';

@Module({
  imports: [ConfigModule],
  providers: [MailerConfigService],
  exports: [MailerConfigService],
})
export class MailerConfigModule {}

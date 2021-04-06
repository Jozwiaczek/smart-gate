import { Module } from '@nestjs/common';

import { ConfigModule } from '../../config/config.module';
import { SentryConfigService } from './sentry-config.service';

@Module({
  imports: [ConfigModule],
  providers: [SentryConfigService],
  exports: [SentryConfigService],
})
export class SentryConfigModule {}

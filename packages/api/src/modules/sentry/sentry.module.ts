import { Module } from '@nestjs/common';

import { ConfigModule } from '../config/config.module';
import { SentryService } from './sentry.service';

@Module({
  imports: [ConfigModule],
  providers: [SentryService],
  exports: [SentryService],
})
export class SentryModule {}

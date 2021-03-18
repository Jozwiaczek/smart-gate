import { Module } from '@nestjs/common';

import { SentryService } from './sentry.service';

@Module({
  imports: [],
  providers: [SentryService],
  exports: [SentryService],
})
export class SentryModule {}

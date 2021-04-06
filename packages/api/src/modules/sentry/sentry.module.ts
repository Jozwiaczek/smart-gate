import { Module } from '@nestjs/common';

import { SentryConfigModule } from './config/sentry-config.module';
import { SentryInterceptor } from './sentry.interceptor';
import { SentryService } from './sentry.service';

@Module({
  imports: [SentryConfigModule],
  providers: [SentryService, SentryInterceptor],
  exports: [SentryService, SentryInterceptor],
})
export class SentryModule {}

import { Module } from '@nestjs/common';

import { SentryInterceptor } from './sentry.interceptor';

@Module({
  imports: [],
  providers: [SentryInterceptor],
  exports: [SentryInterceptor],
})
export class SentryModule {}

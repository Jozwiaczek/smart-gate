import { Module } from '@nestjs/common';

import { SentryModule } from '../sentry/sentry.module';
import { GlobalExceptionsFilter } from './global-exceptions-filter';

@Module({
  imports: [SentryModule],
  providers: [GlobalExceptionsFilter],
  exports: [GlobalExceptionsFilter],
})
export class GlobalExceptionsFilterModule {}

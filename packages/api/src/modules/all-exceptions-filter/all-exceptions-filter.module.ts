import { Module } from '@nestjs/common';

import { SentryModule } from '../sentry/sentry.module';
import { AllExceptionsFilter } from './all-exceptions-filter';

@Module({
  imports: [SentryModule],
  providers: [AllExceptionsFilter],
  exports: [AllExceptionsFilter],
})
export class AllExceptionsFilterModule {}

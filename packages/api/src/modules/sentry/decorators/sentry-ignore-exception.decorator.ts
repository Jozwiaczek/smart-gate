import { SetMetadata } from '@nestjs/common';

export const SENTRY_IGNORE_EXCEPTION_KEY = 'SENTRY_IGNORE';
export const SentryIgnoreException = (ignore = true) =>
  SetMetadata(SENTRY_IGNORE_EXCEPTION_KEY, ignore);

import { SetMetadata } from '@nestjs/common';

export const SENTRY_TRANSACTION_KEY = 'SENTRY_TRANSACTION';
export const UseSentryTransaction = (enable = true) => SetMetadata(SENTRY_TRANSACTION_KEY, enable);

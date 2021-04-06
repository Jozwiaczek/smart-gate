import { Injectable } from '@nestjs/common';
import * as sentry from '@sentry/node';

import { Config } from '../../config/config';

@Injectable()
export class SentryConfigService {
  constructor(private readonly config: Config) {}

  getIsSentryEnable(): boolean | undefined {
    return this.config.sentry.enabled;
  }

  getSentryOptions(): sentry.NodeOptions {
    return {
      debug: this.config.sentry.debug,
      dsn: this.config.sentry.dsn,
      environment: this.config.sentry.environment || 'production',
      tracesSampleRate: this.config.sentry.tracesSampleRate,
    };
  }
}

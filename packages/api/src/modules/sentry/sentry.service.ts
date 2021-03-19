import { Injectable } from '@nestjs/common';
import * as sentry from '@sentry/node';

import { Config } from '../config/config';

@Injectable()
export class SentryService {
  constructor(private readonly config: Config) {}

  public async captureException(exception: unknown): Promise<void> {
    if (!this.config.sentry.enabled) {
      return;
    }

    const sentryClient = this.getClient();

    console.log('Sending issue to Sentry');
    sentryClient.captureException(exception);
    await sentryClient.flush(5000);
  }

  private getClient(): sentry.NodeClient {
    if (!sentry.getCurrentHub().getClient()) {
      // Initialisation might take few seconds
      console.log('Initializing Sentry client');

      sentry.init({
        debug: this.config.sentry.debug,
        dsn: this.config.sentry.dsn,
        environment: this.config.sentry.environment || 'production',
      });
    }

    return sentry.getCurrentHub().getClient() as sentry.NodeClient;
  }
}

import { Injectable } from '@nestjs/common';
import * as sentry from '@sentry/node';

@Injectable()
export class SentryService {
  public async captureException(exception: unknown): Promise<void> {
    if (!process.env.SENTRY_ENABLED) {
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
        debug: Boolean(process.env.sentry_debug),
        dsn: process.env.SENTRY_DSN,
        environment: process.env.SENTRY_ENVIRONMENT || 'production',
      });
    }

    return sentry.getCurrentHub().getClient() as sentry.NodeClient;
  }
}

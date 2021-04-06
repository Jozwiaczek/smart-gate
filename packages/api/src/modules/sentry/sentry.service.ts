import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import * as Sentry from '@sentry/node';

import { SentryConfigService } from './config/sentry-config.service';

@Injectable()
export class SentryService implements OnApplicationBootstrap {
  constructor(private readonly sentryConfigService: SentryConfigService) {}

  onApplicationBootstrap(): void {
    if (this.sentryConfigService.getIsSentryEnable()) {
      Sentry.init(this.sentryConfigService.getSentryOptions());
    }
  }
}

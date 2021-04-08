import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';

import { onlyOnDevEnv } from './utils';

const {
  REACT_APP_SENTRY_DEBUG,
  REACT_APP_SENTRY_ENABLED,
  REACT_APP_SENTRY_ENVIRONMENT,
  REACT_APP_SENTRY_DSN,
  REACT_APP_SENTRY_TRACES_SAMPLE,
} = process.env;

onlyOnDevEnv(() => console.log('Initializing sentry'));
Sentry.init({
  dsn: REACT_APP_SENTRY_DSN,
  integrations: [new Integrations.BrowserTracing()],
  debug: REACT_APP_SENTRY_DEBUG === 'true',
  enabled: REACT_APP_SENTRY_ENABLED === 'true',
  environment: REACT_APP_SENTRY_ENVIRONMENT || 'production',
  tracesSampleRate:
    REACT_APP_SENTRY_TRACES_SAMPLE === undefined ? 0 : parseInt(REACT_APP_SENTRY_TRACES_SAMPLE, 10),
});

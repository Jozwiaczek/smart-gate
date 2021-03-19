import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';

const {
  REACT_APP_SENTRY_DEBUG,
  REACT_APP_SENTRY_ENABLED,
  REACT_APP_SENTRY_ENVIRONMENT,
  REACT_APP_SENTRY_DSN,
} = process.env;

console.log('Initialize sentry');

Sentry.init({
  dsn: REACT_APP_SENTRY_DSN,
  integrations: [new Integrations.BrowserTracing()],
  debug: Boolean(REACT_APP_SENTRY_DEBUG),
  environment: REACT_APP_SENTRY_ENVIRONMENT || 'production',
  enabled: Boolean(REACT_APP_SENTRY_ENABLED),
});

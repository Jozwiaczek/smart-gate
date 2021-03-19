import { Injectable } from '@nestjs/common';

import { Config } from './config';
import { EnvConfigService } from './env-config/env-config.service';

@Injectable()
export class ConfigLoader {
  constructor(private readonly envConfigService: EnvConfigService) {}

  public async loadConfig(): Promise<Config> {
    const nodeENV = this.envConfigService.get('NODE_ENV', true);
    const isProd = nodeENV === 'production';
    const isTest = nodeENV === 'test';
    const isDev = nodeENV === 'development';

    return {
      port: this.envConfigService.get('PORT', isProd, Number),
      clientUrl: this.envConfigService.get('CLIENT_URL', isProd),
      rateLimiter: {
        minTime: this.envConfigService.get('RATE_LIMIT_MIN_TIME', isProd, Number),
        maxConcurrent: this.envConfigService.get('RATE_LIMIT_MAX_CONCURRENT', isProd, Number),
      },
      database: {
        database: this.envConfigService.get('DB_DATABASE', !isTest) || '',
        databaseTest: this.envConfigService.get('DB_DATABASE_TEST', isTest) || '',
        host: this.envConfigService.get('DB_HOST', true),
        port: this.envConfigService.get('DB_PORT', false, Number),
        username: this.envConfigService.get('DB_USERNAME', true),
        password: this.envConfigService.get('DB_PASSWORD', true),
        logging: this.envConfigService.get('DB_LOGGING', false, Boolean),
      },
      pgAdmin: {
        defaultEmail: this.envConfigService.get('PGADMIN_DEFAULT_EMAIL'),
        defaultPassword: this.envConfigService.get('PGADMIN_DEFAULT_PASSWORD'),
        port: this.envConfigService.get('PGADMIN_PORT', false, Number),
      },
      authSecrets: {
        cookie: this.envConfigService.get('COOKIE_SECRET', !isTest),
        access: this.envConfigService.get('ACCESS_SECRET', !isTest),
        refresh: this.envConfigService.get('REFRESH_SECRET', !isTest),
        logout: this.envConfigService.get('LOGOUT_SECRET', !isTest),
      },
      mailer: {
        sendGridSecret: this.envConfigService.get('SENDGRID_API_KEY', isProd),
        etherealAuth: {
          user: this.envConfigService.get('ETHEREAL_USER'),
          pass: this.envConfigService.get('ETHEREAL_PASSWORD'),
        },
        sender: this.envConfigService.get('SENDER'),
        replyTo: this.envConfigService.get('REPLY_TO', isProd),
      },
      sentry: {
        debug: this.envConfigService.get('SENTRY_DEBUG', false, Boolean),
        dsn: this.envConfigService.get('SENTRY_DSN', isProd),
        enabled: this.envConfigService.get('SENTRY_ENABLED', isProd, Boolean),
        environment: this.envConfigService.get('SENTRY_ENVIRONMENT', false),
      },
      environment: {
        isProd,
        isDev,
        isTest,
      },
    };
  }
}

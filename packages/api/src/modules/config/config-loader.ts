import { Injectable } from '@nestjs/common';

import { Config } from './config';
import { EnvironmentConfigService } from './environment-config/environment-config.service';

@Injectable()
export class ConfigLoader {
  constructor(private readonly environmentConfigService: EnvironmentConfigService) {}

  public async loadConfig(): Promise<Config> {
    const nodeENV = this.environmentConfigService.get('NODE_ENV', true);
    const isProd = nodeENV === 'production';
    const isTest = nodeENV === 'test';
    const isDev = nodeENV === 'development';

    const NumberOrUndefined = (num: string | undefined) => (num ? Number(num) : undefined);

    return {
      port: this.environmentConfigService.get('PORT', isProd, NumberOrUndefined),
      clientUrl: this.environmentConfigService.get('CLIENT_URL', isProd),
      rateLimiter: {
        minTime: this.environmentConfigService.get('RATE_LIMIT_MIN_TIME', isProd, Number),
        maxConcurrent: this.environmentConfigService.get(
          'RATE_LIMIT_MAX_CONCURRENT',
          isProd,
          Number,
        ),
      },
      database: {
        database: this.environmentConfigService.get('DB_DATABASE', !isTest) || '',
        databaseTest: this.environmentConfigService.get('DB_DATABASE_TEST', isTest) || '',
        host: this.environmentConfigService.get('DB_HOST', true),
        port: this.environmentConfigService.get('DB_PORT', false, Number),
        username: this.environmentConfigService.get('DB_USERNAME', true),
        password: this.environmentConfigService.get('DB_PASSWORD', true),
        logging: this.environmentConfigService.get('DB_LOGGING', false, Boolean),
      },
      pgAdmin: {
        defaultEmail: this.environmentConfigService.get('PGADMIN_DEFAULT_EMAIL'),
        defaultPassword: this.environmentConfigService.get('PGADMIN_DEFAULT_PASSWORD'),
        port: this.environmentConfigService.get('PGADMIN_PORT', false, NumberOrUndefined),
      },
      authSecrets: {
        cookie: this.environmentConfigService.get('COOKIE_SECRET', !isTest),
        access: this.environmentConfigService.get('ACCESS_SECRET', !isTest),
        refresh: this.environmentConfigService.get('REFRESH_SECRET', !isTest),
        logout: this.environmentConfigService.get('LOGOUT_SECRET', !isTest),
      },
      mailer: {
        sendGridSecret: this.environmentConfigService.get('SENDGRID_API_KEY', isProd),
        etherealAuth: {
          user: this.environmentConfigService.get('ETHEREAL_USER'),
          pass: this.environmentConfigService.get('ETHEREAL_PASSWORD'),
        },
        sender: this.environmentConfigService.get('SENDER'),
        replyTo: this.environmentConfigService.get('REPLY_TO', isProd),
      },
      environment: {
        isProd,
        isDev,
        isTest,
      },
    };
  }
}

import { Injectable } from '@nestjs/common';

import { Config } from './config';
import { EnvironmentConfigService } from './environment-config/environment-config.service';

@Injectable()
export class ConfigLoader {
  constructor(private readonly environmentConfigService: EnvironmentConfigService) {}

  public async loadConfig(): Promise<Config> {
    const nodeENV = this.environmentConfigService.getStringValue('NODE_ENV', true);
    const isProd = nodeENV === 'production';
    const isTest = nodeENV === 'test';
    const isDev = nodeENV === 'development';

    return {
      port: this.environmentConfigService.getNumberValue('PORT', isProd),
      clientUrl: this.environmentConfigService.getStringValue('CLIENT_URL', isProd),
      rateLimiter: {
        minTime: this.environmentConfigService.getNumberValue('RATE_LIMIT_MIN_TIME', isProd),
        maxConcurrent: this.environmentConfigService.getNumberValue(
          'RATE_LIMIT_MAX_CONCURRENT',
          isProd,
        ),
      },
      database: {
        database: this.environmentConfigService.getStringValue('DB_DATABASE', !isTest),
        databaseTest: this.environmentConfigService.getStringValue('DB_DATABASE_TEST', isTest),
        host: this.environmentConfigService.getStringValue('DB_HOST', true),
        port: this.environmentConfigService.getNumberValue('DB_PORT'),
        username: this.environmentConfigService.getStringValue('DB_USERNAME', true),
        password: this.environmentConfigService.getStringValue('DB_PASSWORD', true),
        logging: this.environmentConfigService.getBooleanValue('DB_LOGGING'),
      },
      pgAdmin: {
        defaultEmail: this.environmentConfigService.getStringValue('PGADMIN_DEFAULT_EMAIL'),
        defaultPassword: this.environmentConfigService.getStringValue('PGADMIN_DEFAULT_PASSWORD'),
        port: this.environmentConfigService.getNumberValue('PGADMIN_PORT'),
      },
      authSecrets: {
        cookie: this.environmentConfigService.getStringValue('COOKIE_SECRET', !isTest),
        access: this.environmentConfigService.getStringValue('ACCESS_SECRET', !isTest),
        refresh: this.environmentConfigService.getStringValue('REFRESH_SECRET', !isTest),
        logout: this.environmentConfigService.getStringValue('LOGOUT_SECRET', !isTest),
      },
      mailer: {
        sendGridSecret: this.environmentConfigService.getStringValue('SENDGRID_API_KEY', isProd),
        etherealAuth: {
          user: this.environmentConfigService.getStringValue('ETHEREAL_USER'),
          pass: this.environmentConfigService.getStringValue('ETHEREAL_PASSWORD'),
        },
        sender: this.environmentConfigService.getStringValue('SENDER'),
        replyTo: this.environmentConfigService.getStringValue('REPLY_TO', isProd),
      },
      environment: {
        isProd,
        isDev,
        isTest,
      },
    };
  }
}

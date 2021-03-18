import { Injectable } from '@nestjs/common';

import { Config } from './config';
import { EnvironmentConfigService } from './environment-config/environment-config.service';

@Injectable()
export class ConfigLoader {
  constructor(private readonly environmentConfigService: EnvironmentConfigService) {}

  public async loadConfig(): Promise<Config> {
    const nodeENV = this.environmentConfigService.getStringValue('NODE_ENV', true);
    const isProduction = nodeENV === 'production';

    return {
      port: this.environmentConfigService.getNumberValue('PORT', isProduction),
      clientUrl: this.environmentConfigService.getStringValue('CLIENT_URL', isProduction),
      rateLimiter: {
        minTime: this.environmentConfigService.getNumberValue('RATE_LIMIT_MIN_TIME', true),
        maxConcurrent: this.environmentConfigService.getNumberValue(
          'RATE_LIMIT_MAX_CONCURRENT',
          true,
        ),
      },
      database: {
        database: this.environmentConfigService.getStringValue('DB_DATABASE', true),
        databaseTest: this.environmentConfigService.getStringValue('DB_DATABASE_TEST', true),
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
        cookie: this.environmentConfigService.getStringValue('COOKIE_SECRET', true),
        access: this.environmentConfigService.getStringValue('ACCESS_SECRET', true),
        refresh: this.environmentConfigService.getStringValue('REFRESH_SECRET', true),
        logout: this.environmentConfigService.getStringValue('LOGOUT_SECRET', true),
      },
      mailer: {
        sendGridSecret: this.environmentConfigService.getStringValue(
          'SENDGRID_API_KEY',
          isProduction,
        ),
        etherealAuth: {
          user: this.environmentConfigService.getStringValue('ETHEREAL_USER'),
          pass: this.environmentConfigService.getStringValue('ETHEREAL_PASSWORD'),
        },
        sender: this.environmentConfigService.getStringValue('SENDER'),
        replyTo: this.environmentConfigService.getStringValue('REPLY_TO', isProduction),
      },
      environment: {
        isProd: isProduction,
        isDev: nodeENV === 'development',
        isTest: nodeENV === 'test',
      },
    };
  }
}

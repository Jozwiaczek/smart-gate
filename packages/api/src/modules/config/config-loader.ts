import { Injectable } from '@nestjs/common';

import { Config } from './config';
import defaultValues from './defaultValues';
import { EnvConfigService } from './env-config/env-config.service';

@Injectable()
export class ConfigLoader {
  constructor(private readonly envConfigService: EnvConfigService) {}

  public async loadConfig(): Promise<Config> {
    const nodeENV = this.envConfigService.get('NODE_ENV', true);
    const isProd = nodeENV === 'production';
    const isTest = nodeENV === 'test';
    const isDev = nodeENV === 'development';

    const convertToBoolean = (str: string) => str === 'true';

    return {
      port: this.envConfigService.get('PORT', isProd, Number),
      clientUrl: this.envConfigService.get('CLIENT_URL'),
      superAdminEmails: this.envConfigService.get('SUPER_ADMIN_EMAILS', false),
      rateLimiter: {
        minTime: this.envConfigService.get('RATE_LIMIT_MIN_TIME', isProd, Number),
        maxConcurrent: this.envConfigService.get('RATE_LIMIT_MAX_CONCURRENT', isProd, Number),
      },
      database: {
        database: this.envConfigService.get('DB_DATABASE', !isTest) || '',
        databaseTest: this.envConfigService.get('DB_DATABASE_TEST', isTest) || '',
        host: this.envConfigService.get('DB_HOST'),
        port: this.envConfigService.get('DB_PORT', false, Number),
        username: this.envConfigService.get('DB_USERNAME'),
        password: this.envConfigService.get('DB_PASSWORD'),
        logging: this.envConfigService.get('DB_LOGGING', false, convertToBoolean),
      },
      pgAdmin: {
        defaultEmail: this.envConfigService.get('PGADMIN_DEFAULT_EMAIL'),
        defaultPassword: this.envConfigService.get('PGADMIN_DEFAULT_PASSWORD'),
        port: this.envConfigService.get('PGADMIN_PORT', false, Number),
      },
      cookie: {
        secret: this.envConfigService.get('COOKIE_SECRET', !isTest),
      },
      tokens: {
        accessToken: {
          secret: this.envConfigService.get('ACCESS_SECRET'),
          name:
            this.envConfigService.get('ACCESS_NAME', false) ||
            defaultValues.tokens.accessToken.name,
          expirationTime:
            this.envConfigService.get('ACCESS_EXPIRATION_TIME', false) ||
            defaultValues.tokens.accessToken.expirationTime,
        },
        logoutToken: {
          secret: this.envConfigService.get('LOGOUT_SECRET'),
          name:
            this.envConfigService.get('LOGOUT_NAME', false) ||
            defaultValues.tokens.logoutToken.name,
        },
        refreshToken: {
          name:
            this.envConfigService.get('REFRESH_NAME', false) ||
            defaultValues.tokens.refreshToken.name,
          expirationTimeWithKeepMeLoggedIn:
            this.envConfigService.get('REFRESH_EXPIRATION_TIME_WITH_KEEP_ME_LOGGED_IN', false) ||
            defaultValues.tokens.refreshToken.expirationTimeWithKeepMeLoggedIn,
          expirationTimeWithoutKeepMeLoggedIn:
            this.envConfigService.get('REFRESH_EXPIRATION_TIME_WITHOUT_KEEP_ME_LOGGED_IN', false) ||
            defaultValues.tokens.refreshToken.expirationTimeWithoutKeepMeLoggedIn,
        },
      },
      passwordReset: {
        passwordResetTime: this.envConfigService.get('PASSWORD_RESET_TIME', false, Number),
      },
      invitation: {
        expirationDate:
          this.envConfigService.get('INVITATION_EXPIRATION_DATE', false) ||
          defaultValues.invitation.expirationDate,
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
        debug: this.envConfigService.get('SENTRY_DEBUG', false, convertToBoolean),
        dsn: this.envConfigService.get('SENTRY_DSN', isProd),
        enabled: this.envConfigService.get('SENTRY_ENABLED', isProd, convertToBoolean),
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

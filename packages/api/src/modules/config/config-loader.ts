import { Injectable } from '@nestjs/common';

import { Role } from '../../enums/role.enum';
import { Config } from './config';
import defaultValues from './defaultValues';
import { EnvConfigService } from './env-config/env-config.service';

@Injectable()
export class ConfigLoader {
  constructor(private readonly envConfigService: EnvConfigService) {}

  public loadConfig(): Config {
    const nodeENV = this.envConfigService.get('NODE_ENV', true);
    const isProd = nodeENV === 'production';
    const isTest = nodeENV === 'test';
    const isDev = nodeENV === 'development';

    const convertToBoolean = (str: string) => str === 'true';

    return {
      port: this.envConfigService.get('API_PORT', isProd, Number),
      clientUrl: this.envConfigService.get('CLIENT_URL'),
      superAdminEmails: this.envConfigService.get('SUPER_ADMIN_EMAILS', false),
      testUser: {
        email: this.envConfigService.get('TEST_USER_EMAIL', isTest),
        password: this.envConfigService.get('TEST_USER_PASSWORD', isTest),
        firstName: this.envConfigService.get('TEST_USER_FIRSTNAME', isTest),
        lastName: this.envConfigService.get('TEST_USER_LASTNAME', isTest),
        role: this.envConfigService.get('TEST_USER_ROLE', isTest),
      },
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
      authTokens: {
        accessToken: {
          secret: this.envConfigService.get('ACCESS_SECRET'),
          expirationTime:
            this.envConfigService.get('ACCESS_EXPIRATION_TIME', false) ||
            defaultValues.authTokens.accessToken.expirationTime,
        },
        logoutToken: {
          secret: this.envConfigService.get('LOGOUT_SECRET'),
        },
        refreshToken: {
          expirationTimeWithKeepMeLoggedIn:
            this.envConfigService.get('REFRESH_EXPIRATION_TIME_WITH_KEEP_ME_LOGGED_IN', false) ||
            defaultValues.authTokens.refreshToken.expirationTimeWithKeepMeLoggedIn,
          expirationTimeWithoutKeepMeLoggedIn:
            this.envConfigService.get('REFRESH_EXPIRATION_TIME_WITHOUT_KEEP_ME_LOGGED_IN', false) ||
            defaultValues.authTokens.refreshToken.expirationTimeWithoutKeepMeLoggedIn,
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
        sender: this.envConfigService.get('SENDER', false) || defaultValues.mailer.sender,
        replyTo: this.envConfigService.get('REPLY_TO', false) || defaultValues.mailer.replyTo,
        from: this.envConfigService.get('FROM', false) || defaultValues.mailer.from,
      },
      sentry: {
        tracesSampleRate:
          this.envConfigService.get('SENTRY_TRACES_SAMPLE_RATE', false, Number) ??
          defaultValues.sentry.tracesSampleRate,
        debug: this.envConfigService.get('SENTRY_DEBUG', false, convertToBoolean),
        dsn: this.envConfigService.get('SENTRY_DSN', isProd),
        isEnable:
          this.envConfigService.get('SENTRY_ENABLED', isProd, convertToBoolean) ||
          defaultValues.sentry.isEnable,
        environment:
          this.envConfigService.get('SENTRY_ENVIRONMENT', false) ||
          defaultValues.sentry.environment,
      },
      environment: {
        isProd,
        isDev,
        isTest,
      },
    };
  }
}

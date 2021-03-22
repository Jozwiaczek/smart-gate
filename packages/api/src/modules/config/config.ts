import { Injectable } from '@nestjs/common';

@Injectable()
export class Config {
  port: number | undefined;

  clientUrl: string;

  superAdminEmails: string | undefined;

  database: {
    database: string;
    databaseTest: string;
    host: string;
    port: number | undefined;
    username: string;
    password: string;
    logging: boolean | undefined;
  };

  pgAdmin: {
    defaultEmail: string | undefined;
    defaultPassword: string | undefined;
    port: number | undefined;
  };

  authSecrets: {
    cookie: string | undefined;
    access: string | undefined;
    refresh: string | undefined;
    logout: string | undefined;
  };

  rateLimiter: {
    minTime: number | undefined;
    maxConcurrent: number | undefined;
  };

  sentry: {
    debug: boolean | undefined;
    dsn: string | undefined;
    enabled: boolean | undefined;
    environment: string | undefined;
  };

  mailer: {
    sendGridSecret: string | undefined;
    etherealAuth: {
      user: string | undefined;
      pass: string | undefined;
    };
    sender: string | undefined;
    replyTo: string | undefined;
  };

  passwordReset: {
    passwordResetTime: number | undefined;
  };

  invitation: {
    expirationDate: string;
  };

  environment: {
    isDev: boolean;
    isProd: boolean;
    isTest: boolean;
  };
}

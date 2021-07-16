import { Injectable } from '@nestjs/common';

@Injectable()
export class Config {
  port: number | undefined;

  clientUrl: string;

  superAdminEmails: string | undefined;

  testUser: {
    email: string | undefined;
    emailToInvite: string | undefined;
    password: string | undefined;
    firstName: string | undefined;
    lastName: string | undefined;
  };

  pushNotifications: {
    publicVapidKey: string;
    privateVapidKey: string;
  };

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

  cookie: {
    secret: string | undefined;
  };

  authTokens: {
    accessToken: {
      secret: string;
      expirationTime: string;
    };
    logoutToken: {
      secret: string;
    };
    refreshToken: {
      expirationTimeWithKeepMeLoggedIn: string;
      expirationTimeWithoutKeepMeLoggedIn: string;
    };
  };

  rateLimiter: {
    minTime: number | undefined;
    maxConcurrent: number | undefined;
  };

  sentry: {
    debug: boolean | undefined;
    dsn: string | undefined;
    isEnable: boolean;
    environment: string;
    tracesSampleRate: number;
  };

  mailer: {
    sendGridSecret: string | undefined;
    etherealAuth: {
      user: string | undefined;
      pass: string | undefined;
    };
    sender: string;
    replyTo: string;
    from: string;
  };

  passwordReset: {
    passwordResetTime: number | undefined;
  };

  invitation: {
    expirationDate: string;
  };

  device: {
    ticket: string;
  };

  environment: {
    isDev: boolean;
    isProd: boolean;
    isTest: boolean;
  };
}

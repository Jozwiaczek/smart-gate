import { Injectable } from '@nestjs/common';
import nodemailer from 'nodemailer';

interface MailerAuthConfig {
  user: string;
  pass: string;
}

interface MailerConfig<T = MailerAuthConfig> {
  host: string;
  port: number;
  secure: boolean;
  requireTLS: boolean;
  auth: T;
}

@Injectable()
export class MailerConfigService {
  public async getConfig(): Promise<MailerConfig> {
    const baseConfig = {
      port: 587,
      secure: false,
      requireTLS: true,
    };

    const { NODE_ENV, SENDGRID_API_KEY, ETHEREAL_USER, ETHEREAL_PASSWORD } = process.env;
    if (NODE_ENV === 'production') {
      return this.validateConfig({
        ...baseConfig,
        host: 'smtp.sendgrid.net',
        auth: {
          user: 'apikey',
          pass: SENDGRID_API_KEY,
        },
      });
    }

    let auth = {
      user: ETHEREAL_USER,
      pass: ETHEREAL_PASSWORD,
    };
    if (!auth.user || !auth.pass) {
      auth = await nodemailer.createTestAccount();
    }

    return this.validateConfig({
      ...baseConfig,
      host: 'smtp.ethereal.email',
      auth,
    });
  }

  private validateConfig(config: Partial<MailerConfig<Partial<MailerAuthConfig>>>): MailerConfig {
    if (config.host === undefined) throw new Error('Empty mailer host');
    if (config.port === undefined) throw new Error('Empty mailer port');
    if (config.secure === undefined) throw new Error('Empty mailer secure flag');
    if (config.requireTLS === undefined) throw new Error('Empty mailer requireTLS flag');
    if (config.auth?.user === undefined) throw new Error('Empty mailer auth user');
    if (config.auth?.pass === undefined) throw new Error('Empty mailer auth pass');
    return config as MailerConfig;
  }
}

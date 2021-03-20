import { Injectable } from '@nestjs/common';
import nodemailer from 'nodemailer';

import { Config } from '../../config/config';

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

interface SendEmailConfig {
  sender: string;
  replyTo: string;
}

@Injectable()
export class MailerConfigService {
  constructor(private readonly config: Config) {}

  public async getTransporterConfig(): Promise<MailerConfig> {
    const baseConfig = {
      port: 587,
      secure: false,
      requireTLS: true,
    };

    if (this.config.environment.isProd) {
      return {
        ...baseConfig,
        host: 'smtp.sendgrid.net',
        auth: {
          user: 'apikey',
          pass: this.config.mailer.sendGridSecret || '',
        },
      };
    }

    let auth = {
      user: this.config.mailer.etherealAuth.user || '',
      pass: this.config.mailer.etherealAuth.pass || '',
    };
    if (!auth.user || !auth.pass) {
      auth = await nodemailer.createTestAccount();
    }

    return {
      ...baseConfig,
      host: 'smtp.ethereal.email',
      auth,
    };
  }

  public getSendEmailConfig(): SendEmailConfig {
    return {
      sender: this.config.mailer.sender || 'Smart Gate',
      replyTo: this.config.mailer.replyTo || 'sg@gmail.com',
    };
  }

  public getClientUrl(): string {
    return this.config.clientUrl;
  }
}

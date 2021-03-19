import { Injectable } from '@nestjs/common';
import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';

import { Config } from '../config/config';
import { MailerConfigService } from './config/mailer-config.service';

@Injectable()
export class MailerService {
  constructor(
    private readonly mailerConfigService: MailerConfigService,
    private readonly config: Config,
  ) {}

  async sendEmail(options: Mail.Options): Promise<void> {
    const transporterBaseConfig = await this.mailerConfigService.getTransporterConfig();
    const transporter = nodemailer.createTransport(transporterBaseConfig);

    const emailResult = await transporter.sendMail({
      ...this.mailerConfigService.getSendEmailConfig(),
      ...options,
    });

    if (this.config.environment.isProd) {
      console.log('Message sent: %s', emailResult.messageId);
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(emailResult));
    }
  }
}

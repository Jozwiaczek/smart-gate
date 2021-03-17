import { Injectable } from '@nestjs/common';
import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';

import { MailerConfigService } from './config/mailer-config.service';

@Injectable()
export class MailerService {
  constructor(private readonly mailerConfigService: MailerConfigService) {}

  async sendEmail(options: Mail.Options): Promise<void> {
    const mailerConfig = await this.mailerConfigService.getConfig();
    const transporter = nodemailer.createTransport(mailerConfig);

    const emailResult = await transporter.sendMail({
      from: '"Smart Gate" <no-reply@smartgate.com>',
      ...options,
    });

    if (process.env.NODE_ENV !== 'production') {
      console.log('Message sent: %s', emailResult.messageId);
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(emailResult));
    }
  }
}

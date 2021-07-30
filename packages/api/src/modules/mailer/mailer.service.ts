import { Injectable } from '@nestjs/common';
import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import SESTransport from 'nodemailer/lib/ses-transport';

import { passwordResetTemplate, welcomeTemplate } from '../../emailTemplates';
import { Config } from '../config/config';
import { MailerConfigService } from './config/mailer-config.service';

@Injectable()
export class MailerService {
  constructor(
    private readonly mailerConfigService: MailerConfigService,
    private readonly config: Config,
  ) {}

  private async sendEmail(options: Mail.Options): Promise<void> {
    const transporterBaseConfig = await this.mailerConfigService.getTransporterConfig();
    const transporter = nodemailer.createTransport(transporterBaseConfig);

    const emailResult = (await transporter.sendMail({
      ...this.mailerConfigService.getSendEmailConfig(),
      ...options,
    })) as SESTransport.SentMessageInfo;

    if (this.config.environment.isDev) {
      console.log('Message sent: %s', emailResult.messageId);
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(emailResult));
    }
  }

  async sendPasswordRecovery(email: string, firstName: string, link: string): Promise<void> {
    await this.sendEmail({
      to: email,
      subject: 'Smart Gate - Password recovery',
      html: passwordResetTemplate({
        firstName,
        link,
        clientUrl: this.mailerConfigService.getClientUrl(),
      }),
    });
  }

  async sendInvitation(email: string, link: string): Promise<void> {
    await this.sendEmail({
      to: email,
      subject: 'Smart Gate - Invitation',
      html: welcomeTemplate({
        link,
        clientUrl: this.mailerConfigService.getClientUrl(),
      }),
    });
  }
}

import { Injectable } from '@nestjs/common';
import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';

import { logoBase64 } from '../../emailTemplates/constants';

@Injectable()
export class MailerService {
  transporter = nodemailer.createTransport(this.getTransporterConfig());

  getTransporterConfig() {
    const { NODE_ENV, SENDGRID_API_KEY, ETHEREAL_USER, ETHEREAL_PASSWORD } = process.env;
    if (NODE_ENV === 'production') {
      return {
        host: 'smtp.sendgrid.net',
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
          user: 'apikey',
          pass: SENDGRID_API_KEY,
        },
      };
    }

    return {
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      requireTLS: false,
      auth: {
        user: ETHEREAL_USER,
        pass: ETHEREAL_PASSWORD,
      },
    };
  }

  async sendEmail(options: Mail.Options): Promise<void> {
    const emailResult = await this.transporter.sendMail({
      from: '"Smart Gate" <no-reply@smartgate.com>',
      attachments: [
        {
          filename: 'logo.png',
          content: logoBase64,
          cid: 'logoUnique',
          encoding: 'base64',
        },
      ],
      ...options,
    });

    if (process.env.NODE_ENV !== 'production') {
      console.log('Message sent: %s', emailResult.messageId);
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(emailResult));
    }
  }
}

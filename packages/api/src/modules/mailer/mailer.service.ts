import { Injectable } from '@nestjs/common';
import nodemailer from 'nodemailer';
import Mail, { AttachmentLike } from 'nodemailer/lib/mailer';
import { Readable } from 'stream';

import { logoBase64 } from '../../emailTemplates/constants';

interface SendEmailOptions extends Mail.Options {
  htmlCallback?: ({ logo }: { logo: string }) => string | Buffer | Readable | AttachmentLike;
}

@Injectable()
export class MailerService {
  transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth: {
      user: 'retha82@ethereal.email',
      pass: '896JRSyC1RQzGzPncj',
    },
  });

  async sendEmail({ htmlCallback, ...rest }: SendEmailOptions): Promise<void> {
    const baseOpt = {
      from: '"Smart Gate" <no-reply@smartgate.com>',
      html:
        htmlCallback &&
        htmlCallback({
          logo: logoBase64,
        }),
      ...rest,
    };
    const emailResult = await this.transporter.sendMail(baseOpt);
    console.log('Message sent: %s', emailResult.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(emailResult));
  }
}

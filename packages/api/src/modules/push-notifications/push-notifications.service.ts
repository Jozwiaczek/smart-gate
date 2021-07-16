import { Injectable, Logger } from '@nestjs/common';
import webPush, { PushSubscription } from 'web-push';

import { Config } from '../config/config';

@Injectable()
export class PushNotificationsService {
  private subs: Array<PushSubscription> = [];

  private logger: Logger = new Logger('PushNotifications');

  constructor(private readonly config: Config) {
    const { pushNotifications, mailer } = config;
    const { publicVapidKey, privateVapidKey } = pushNotifications;
    const { replyTo } = mailer;

    webPush.setVapidDetails(`mailto:${replyTo}`, publicVapidKey, privateVapidKey);
  }

  subscribe(subscription: PushSubscription): void {
    this.logger.log('New push subscriber');
    this.subs.push(subscription);
    this.logger.log(`${this.subs.length} subscriptions`);
  }

  async send(): Promise<void> {
    this.logger.log('Sending...');

    if (!this.subs.length) {
      this.logger.log('No subscribers');
      return;
    }

    const payload = JSON.stringify({
      title: 'Push Test',
      options: {
        body: 'Smart Gate notification',
      },
    } as PushNotificationPayload);

    const promises = this.subs.map((subscription) =>
      webPush.sendNotification(subscription, payload),
    );

    await Promise.all(promises);
    this.logger.log('Sent');
  }
}

import { Injectable, Logger } from '@nestjs/common';
import webPush, { PushSubscription } from 'web-push';

import { Config } from '../config/config';
import { PushNotificationRepository } from '../repository/push-notification.repository';
import { SendPushNotificationDto } from './dto/send-push-notification.dto';
import { SubscribePushNotificationDto } from './dto/subscribe-push-notification.dto';

@Injectable()
export class PushNotificationsService {
  private logger: Logger = new Logger('PushNotifications');

  constructor(
    private readonly config: Config,
    private readonly pushNotificationRepository: PushNotificationRepository,
  ) {
    const { pushNotifications, mailer } = config;
    const { publicVapidKey, privateVapidKey } = pushNotifications;
    const { replyTo } = mailer;

    webPush.setVapidDetails(`mailto:${replyTo}`, publicVapidKey, privateVapidKey);
  }

  async subscribe({ subscription, userPromise }: SubscribePushNotificationDto): Promise<void> {
    this.logger.log('New push subscriber');
    await this.pushNotificationRepository.create({
      user: userPromise,
      endpoint: subscription.endpoint,
      p256dh: subscription.keys.p256dh,
      auth: subscription.keys.auth,
    });
  }

  async send({ title, body, options }: SendPushNotificationDto): Promise<void> {
    this.logger.log('Sending...');

    const allSubscriptions = await this.pushNotificationRepository.find();

    if (!allSubscriptions.length) {
      this.logger.log('No push subscriptions');
      return;
    }

    const payload: PushNotificationPayload = {
      title,
      options: {
        body,
        ...options,
      },
    };

    const sendNotificationsPromises = allSubscriptions.map(({ endpoint, p256dh, auth }) => {
      const sub: PushSubscription = { endpoint, keys: { p256dh, auth } };
      return webPush.sendNotification(sub, JSON.stringify(payload));
    });

    await Promise.all(sendNotificationsPromises);
    this.logger.log(
      `Sent ${allSubscriptions.length} ${
        allSubscriptions.length > 1 ? 'notifications' : 'notification'
      }`,
    );
  }
}

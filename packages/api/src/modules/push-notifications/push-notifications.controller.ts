import { Body, Controller, Get, Post } from '@nestjs/common';
import { PushSubscription } from 'web-push';

import { PushNotificationsService } from './push-notifications.service';

// @Auth()
@Controller('push-notifications')
export class PushNotificationsController {
  constructor(private readonly pushNotificationsService: PushNotificationsService) {}

  @Post()
  subscribe(@Body() subscription: PushSubscription) {
    this.pushNotificationsService.subscribe(subscription);
  }

  @Get()
  async send() {
    await this.pushNotificationsService.send();
  }
}

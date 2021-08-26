import { Body, Controller, Get, Post } from '@nestjs/common';
import { PushSubscription } from 'web-push';

import { Auth } from '../auth/decorators/auth.decorator';
import { CookiePayload } from '../auth/decorators/cookiePayload.decorator';
import { UserFromCookiePayloadPipe } from '../auth/pipes/user-from-cookie-payload.pipe';
import { UserEntity } from '../database/entities/user.entity';
import { PushNotificationsService } from './push-notifications.service';

@Auth()
@Controller('push-notifications')
export class PushNotificationsController {
  constructor(private readonly pushNotificationsService: PushNotificationsService) {}

  @Get()
  async send(): Promise<void> {
    await this.pushNotificationsService.send({
      title: 'test title',
      body: 'test body',
    });
  }

  @Post()
  async subscribe(
    @CookiePayload(UserFromCookiePayloadPipe) user: UserEntity,
    @Body() subscription: PushSubscription,
  ): Promise<void> {
    await this.pushNotificationsService.subscribe({ subscription, user });
  }
}

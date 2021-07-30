import { Body, Controller, Get, Post } from '@nestjs/common';
import { PushSubscription } from 'web-push';

import { TokenPayload } from '../../interfaces/token-types';
import { AuthService } from '../auth/auth.service';
import { Auth } from '../auth/decorators/auth.decorator';
import { CookiePayload } from '../auth/decorators/cookiePayload.decorator';
import { PushNotificationsService } from './push-notifications.service';

@Auth()
@Controller('push-notifications')
export class PushNotificationsController {
  constructor(
    private readonly pushNotificationsService: PushNotificationsService,
    private readonly authService: AuthService,
  ) {}

  @Get()
  async send(): Promise<void> {
    await this.pushNotificationsService.send({
      title: 'test title',
      body: 'test body',
    });
  }

  @Post()
  async subscribe(
    @CookiePayload() { sub }: TokenPayload,
    @Body() subscription: PushSubscription,
  ): Promise<void> {
    const user = await this.authService.getUser(sub);
    await this.pushNotificationsService.subscribe({ subscription, user });
  }
}

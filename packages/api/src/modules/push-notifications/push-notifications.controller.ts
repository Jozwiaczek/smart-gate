import { Body, Controller, Post } from '@nestjs/common';
import { PushSubscription } from 'web-push';

import { Role } from '../../enums/role.enum';
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

  @Post()
  async subscribe(
    @CookiePayload() { sub }: TokenPayload,
    @Body() subscription: PushSubscription,
  ): Promise<void> {
    const userPromise = this.authService.getUser(sub);
    await this.pushNotificationsService.subscribe({ subscription, userPromise });
  }
}

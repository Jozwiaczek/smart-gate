import { Module } from '@nestjs/common';

import { ConfigModule } from '../config/config.module';
import { PushNotificationsController } from './push-notifications.controller';
import { PushNotificationsService } from './push-notifications.service';

@Module({
  imports: [ConfigModule],
  providers: [PushNotificationsService],
  controllers: [PushNotificationsController],
})
export class PushNotificationsModule {}

import { Module } from '@nestjs/common';

import { UsersModule } from '../users/users.module';
import { WebsocketModule } from '../websocket/websocket.module';
import { ExternalAutomationsController } from './external-automations.controller';
import { ExternalAutomationsService } from './external-automations.service';

@Module({
  controllers: [ExternalAutomationsController],
  providers: [ExternalAutomationsService],
  imports: [WebsocketModule, UsersModule],
})
export class ExternalAutomationsModule {}

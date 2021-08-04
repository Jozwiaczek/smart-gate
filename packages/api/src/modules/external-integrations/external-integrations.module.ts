import { Module } from '@nestjs/common';

import { UsersModule } from '../users/users.module';
import { WebsocketModule } from '../websocket/websocket.module';
import { ExternalIntegrationsController } from './external-integrations.controller';
import { ExternalIntegrationsService } from './external-integrations.service';

@Module({
  controllers: [ExternalIntegrationsController],
  providers: [ExternalIntegrationsService],
  imports: [WebsocketModule, UsersModule],
})
export class ExternalIntegrationsModule {}

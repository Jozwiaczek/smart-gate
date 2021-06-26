import { Module } from '@nestjs/common';

import { TicketModule } from '../ticket/ticket.module';
import { WebsocketConfigModule } from './config/websocket-config.module';
import { Websocket } from './websocket.gateway';

@Module({
  imports: [TicketModule, WebsocketConfigModule],
  providers: [Websocket],
  exports: [Websocket],
})
export class WebsocketModule {}

import { CacheModule, Module } from '@nestjs/common';

import { HistoryModule } from '../history/history.module';
import { TicketModule } from '../ticket/ticket.module';
import { UsersModule } from '../users/users.module';
import { WebsocketConfigModule } from './config/websocket-config.module';
import { Websocket } from './websocket.gateway';

@Module({
  imports: [
    CacheModule.register(),
    TicketModule,
    WebsocketConfigModule,
    HistoryModule,
    UsersModule,
  ],
  providers: [Websocket],
  exports: [Websocket],
})
export class WebsocketModule {}

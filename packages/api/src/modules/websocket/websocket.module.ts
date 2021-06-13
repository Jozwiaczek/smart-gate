import { Module } from '@nestjs/common';

import { Websocket } from './websocket.gateway';

@Module({
  imports: [],
  providers: [Websocket],
  exports: [Websocket],
})
export class WebsocketModule {}

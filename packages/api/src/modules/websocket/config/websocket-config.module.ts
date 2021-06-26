import { Module } from '@nestjs/common';

import { ConfigModule } from '../../config/config.module';
import { WebsocketConfigService } from './websocket-config.service';

@Module({
  imports: [ConfigModule],
  providers: [WebsocketConfigService],
  exports: [WebsocketConfigService],
})
export class WebsocketConfigModule {}

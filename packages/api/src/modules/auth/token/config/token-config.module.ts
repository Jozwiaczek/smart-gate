import { Module } from '@nestjs/common';

import { ConfigModule } from '../../../config/config.module';
import { TokenConfigService } from './token-config.service';

@Module({
  imports: [ConfigModule],
  providers: [TokenConfigService],
  exports: [TokenConfigService],
})
export class TokenConfigModule {}

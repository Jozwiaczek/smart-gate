import { Module } from '@nestjs/common';

import { ConfigModule } from '../../../config/config.module';
import { CookieConfigService } from './cookie-config.service';

@Module({
  imports: [ConfigModule],
  providers: [CookieConfigService],
  exports: [CookieConfigService],
})
export class CookieConfigModule {}

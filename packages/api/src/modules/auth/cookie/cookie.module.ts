import { Module } from '@nestjs/common';

import { CookieConfigModule } from './config/cookie-config.module';
import { CookieService } from './cookie.service';

@Module({
  imports: [CookieConfigModule],
  providers: [CookieService],
  exports: [CookieService],
})
export class CookieModule {}

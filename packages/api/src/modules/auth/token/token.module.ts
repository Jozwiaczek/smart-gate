import { Module } from '@nestjs/common';

import { RepositoryModule } from '../../repository/repository.module';
import { CookieModule } from '../cookie/cookie.module';
import { TokenConfigModule } from './config/token-config.module';
import { TokenService } from './token.service';
import { TokenCookieService } from './token-cookie.service';

@Module({
  imports: [TokenConfigModule, RepositoryModule, CookieModule],
  providers: [TokenService, TokenCookieService],
  exports: [TokenService, TokenCookieService],
})
export class TokenModule {}

import { Module } from '@nestjs/common';

import { RepositoryModule } from '../../repository/repository.module';
import { TokenConfigModule } from './config/token-config.module';
import { TokenService } from './token.service';

@Module({
  imports: [TokenConfigModule, RepositoryModule],
  providers: [TokenService],
  exports: [TokenService],
})
export class TokenModule {}

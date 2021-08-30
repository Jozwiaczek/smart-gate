import { Module } from '@nestjs/common';

import { AuthModule } from '../auth/auth.module';
import { TokenModule } from '../auth/token/token.module';
import { RepositoryModule } from '../repository/repository.module';
import { UsersModule } from '../users/users.module';
import { HistoryController } from './history.controller';
import { HistoryService } from './history.service';

@Module({
  providers: [HistoryService],
  controllers: [HistoryController],
  exports: [HistoryService],
  imports: [UsersModule, AuthModule, TokenModule, RepositoryModule],
})
export class HistoryModule {}

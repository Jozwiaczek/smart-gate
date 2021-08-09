import { Module } from '@nestjs/common';

import { AuthModule } from '../auth/auth.module';
import { TokenModule } from '../auth/token/token.module';
import { RepositoryModule } from '../repository/repository.module';
import { UsersModule } from '../users/users.module';
import { WebsocketModule } from '../websocket/websocket.module';
import { ExternalIntegrationsController } from './external-integrations.controller';
import { ExternalIntegrationsService } from './external-integrations.service';

@Module({
  controllers: [ExternalIntegrationsController],
  providers: [ExternalIntegrationsService],
  imports: [WebsocketModule, UsersModule, AuthModule, RepositoryModule, TokenModule],
  exports: [ExternalIntegrationsService],
})
export class ExternalIntegrationsModule {}

import { Module } from '@nestjs/common';

import { AuthModule } from '../auth/auth.module';
import { TokenModule } from '../auth/token/token.module';
import { RepositoryModule } from '../repository/repository.module';
import { UsersModule } from '../users/users.module';
import { WebsocketModule } from '../websocket/websocket.module';
import { CameraController } from './camera.controller';

@Module({
  imports: [WebsocketModule, UsersModule, AuthModule, RepositoryModule, TokenModule],
  controllers: [CameraController],
})
export class CameraModule {}

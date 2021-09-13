import { CacheModule, Module } from '@nestjs/common';

import { AuthModule } from '../auth/auth.module';
import { TokenModule } from '../auth/token/token.module';
import { RepositoryModule } from '../repository/repository.module';
import { UsersModule } from '../users/users.module';
import { CameraController } from './camera.controller';

@Module({
  imports: [UsersModule, AuthModule, RepositoryModule, TokenModule, CacheModule.register()],
  controllers: [CameraController],
})
export class CameraModule {}

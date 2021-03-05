import { forwardRef, Module } from '@nestjs/common';

import { RefreshTokenModule } from '../refresh-token/refresh-token.module';
// eslint-disable-next-line import/no-cycle
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { OnlyAuthenticatedGuard } from './guards/only-authenticated.guard';

@Module({
  imports: [forwardRef(() => UsersModule), RefreshTokenModule],
  providers: [AuthService, OnlyAuthenticatedGuard],
  exports: [AuthService, OnlyAuthenticatedGuard],
  controllers: [AuthController],
})
export class AuthModule {}

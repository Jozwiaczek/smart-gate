import { forwardRef, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { RefreshTokenModule } from '../refresh-token/refresh-token.module';
// eslint-disable-next-line import/no-cycle
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { OnlyAuthenticatedGuard } from './guards/only-authenticated.guard';
import { LocalStrategy } from './strategies/local/local.strategy';

@Module({
  imports: [forwardRef(() => UsersModule), PassportModule, RefreshTokenModule],
  providers: [AuthService, LocalStrategy, OnlyAuthenticatedGuard],
  exports: [AuthService, OnlyAuthenticatedGuard],
  controllers: [AuthController],
})
export class AuthModule {}

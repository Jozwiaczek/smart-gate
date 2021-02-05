import { forwardRef, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { OnlyAuthenticatedGuard } from './guards/only-authenticated.guard';
import { LocalStrategy } from './strategies/local/local.strategy';
// eslint-disable-next-line import/no-cycle
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { RefreshTokenService } from './refresh-token.service';

@Module({
  imports: [forwardRef(() => UsersModule), PassportModule],
  providers: [AuthService, RefreshTokenService, LocalStrategy, OnlyAuthenticatedGuard],
  exports: [AuthService, OnlyAuthenticatedGuard],
  controllers: [AuthController],
})
export class AuthModule {}

import { forwardRef, Module } from '@nestjs/common';

import { MailerModule } from '../mailer/mailer.module';
import { RefreshTokenModule } from '../refresh-token/refresh-token.module';
import { RepositoryModule } from '../repository/repository.module';
// eslint-disable-next-line import/no-cycle
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { OnlyAuthenticatedGuard } from './guards/only-authenticated.guard';
import { TokenModule } from './token/token.module';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    RefreshTokenModule,
    MailerModule,
    RepositoryModule,
    TokenModule,
  ],
  providers: [AuthService, OnlyAuthenticatedGuard],
  exports: [AuthService, OnlyAuthenticatedGuard],
  controllers: [AuthController],
})
export class AuthModule {}

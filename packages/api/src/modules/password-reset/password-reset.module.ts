import { CacheModule, Module } from '@nestjs/common';

import { AuthModule } from '../auth/auth.module';
import { TokenModule } from '../auth/token/token.module';
import { MailerModule } from '../mailer/mailer.module';
import { RepositoryModule } from '../repository/repository.module';
import { PasswordResetConfigModule } from './config/password-reset-config.module';
import { PasswordResetController } from './password-reset.controller';
import { PasswordResetService } from './password-reset.service';

@Module({
  imports: [
    CacheModule.register(),
    MailerModule,
    PasswordResetConfigModule,
    RepositoryModule,
    AuthModule,
    TokenModule,
  ],
  providers: [PasswordResetService],
  controllers: [PasswordResetController],
})
export class PasswordResetModule {}

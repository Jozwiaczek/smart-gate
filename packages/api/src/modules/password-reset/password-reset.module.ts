import { CacheModule, Module } from '@nestjs/common';

import { MailerModule } from '../mailer/mailer.module';
import { UsersModule } from '../users/users.module';
import { PasswordResetConfigModule } from './config/password-reset-config.module';
import { PasswordResetController } from './password-reset.controller';
import { PasswordResetService } from './password-reset.service';

@Module({
  imports: [UsersModule, CacheModule.register(), MailerModule, PasswordResetConfigModule],
  providers: [PasswordResetService],
  controllers: [PasswordResetController],
})
export class PasswordResetModule {}

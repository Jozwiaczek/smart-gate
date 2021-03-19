import { Module } from '@nestjs/common';

import { ConfigModule } from '../../config/config.module';
import { PasswordResetConfigService } from './password-reset-config.service';

@Module({
  imports: [ConfigModule],
  providers: [PasswordResetConfigService],
  exports: [PasswordResetConfigService],
})
export class PasswordResetConfigModule {}

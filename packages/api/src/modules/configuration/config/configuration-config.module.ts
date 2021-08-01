import { Module } from '@nestjs/common';

import { ConfigModule } from '../../config/config.module';
import { ConfigurationConfigService } from './configuration-config.service';

@Module({
  imports: [ConfigModule],
  providers: [ConfigurationConfigService],
  exports: [ConfigurationConfigService],
})
export class ConfigurationConfigModule {}

import { Module } from '@nestjs/common';

import { RepositoryModule } from '../repository/repository.module';
import { ConfigurationConfigModule } from './config/configuration-config.module';
import { ConfigurationController } from './configuration.controller';
import { ConfigurationService } from './configuration.service';

@Module({
  imports: [RepositoryModule, ConfigurationConfigModule],
  controllers: [ConfigurationController],
  providers: [ConfigurationService],
})
export class ConfigurationModule {}

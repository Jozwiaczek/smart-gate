import { Module } from '@nestjs/common';

import { RepositoryModule } from '../repository/repository.module';
import { ConfigurationConfigModule } from './config/configuration-config.module';
import { ConfigurationService } from './configuration.service';

@Module({
  imports: [RepositoryModule, ConfigurationConfigModule],
  controllers: [],
  providers: [ConfigurationService],
})
export class ConfigurationModule {}

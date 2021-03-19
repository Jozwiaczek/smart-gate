import { Module } from '@nestjs/common';

import { Config } from './config';
import { ConfigLoader } from './config-loader';
import { EnvironmentConfigModule } from './environment-config/environment-config.module';

@Module({
  imports: [EnvironmentConfigModule],
  providers: [
    {
      provide: ConfigLoader,
      useClass: ConfigLoader,
    },
    {
      provide: Config,
      useFactory: async (configLoader: ConfigLoader) => configLoader.loadConfig(),
      inject: [ConfigLoader],
    },
  ],
  exports: [Config],
})
export class ConfigModule {}

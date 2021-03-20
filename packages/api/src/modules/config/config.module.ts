import { Module } from '@nestjs/common';

import { Config } from './config';
import { ConfigLoader } from './config-loader';
import { EnvConfigModule } from './env-config/env-config.module';

@Module({
  imports: [EnvConfigModule],
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

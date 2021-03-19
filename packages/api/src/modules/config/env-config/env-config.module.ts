import { Module } from '@nestjs/common';

import { EnvConfigService } from './env-config.service';

@Module({
  providers: [EnvConfigService],
  exports: [EnvConfigService],
})
export class EnvConfigModule {}

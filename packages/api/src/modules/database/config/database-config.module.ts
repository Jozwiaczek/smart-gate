import { Module } from '@nestjs/common';

import { ConfigModule } from '../../config/config.module';
import { DatabaseConfigService } from './database-config.service';

@Module({
  imports: [ConfigModule],
  providers: [DatabaseConfigService],
  exports: [DatabaseConfigService],
})
export class DatabaseConfigModule {}

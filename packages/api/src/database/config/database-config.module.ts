import { Module } from '@nestjs/common';
import { DatabaseConfigService } from './database-config.service';

@Module({
  imports: [],
  providers: [DatabaseConfigService],
  exports: [DatabaseConfigService],
})
export class DatabaseConfigModule {}

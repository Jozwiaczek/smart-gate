import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DatabaseConfigModule } from './config/database-config.module';
import { DatabaseConfig, DatabaseConfigService } from './config/database-config.service';
import entities from './entities';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [DatabaseConfigModule],
      useFactory: (databaseConfigService: DatabaseConfigService) => {
        const config: DatabaseConfig = databaseConfigService.getConfig();

        return {
          type: 'postgres',
          entities,
          ...config,
        };
      },
      inject: [DatabaseConfigService],
    }),
  ],
})
export class DatabaseModule {}

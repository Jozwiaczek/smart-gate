import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import entities from './entities';
import { DatabaseConfigModule } from './config/database-config.module';
import { DatabaseConfig, DatabaseConfigService } from './config/database-config.service';

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

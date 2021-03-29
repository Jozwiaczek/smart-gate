import { Injectable } from '@nestjs/common';

import { Config } from '../../config/config';

export interface DatabaseConfig {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  synchronize: boolean;
  logging?: boolean;
  ssl?: {
    rejectUnauthorized: boolean;
  };
}

@Injectable()
export class DatabaseConfigService {
  constructor(private readonly config: Config) {}

  public getConfig(): DatabaseConfig {
    const baseConfig = {
      host: this.config.database.host,
      port: this.config.database.port || 5432,
      username: this.config.database.username,
      password: this.config.database.password,
      logging: this.config.database.logging,
      synchronize: false,
    };

    if (this.config.environment.isTest) {
      return {
        ...baseConfig,
        database: this.config.database.databaseTest,
      };
    }

    if (this.config.environment.isProd) {
      return {
        ...baseConfig,
        database: this.config.database.database,
        ssl: {
          rejectUnauthorized: false,
        },
      };
    }

    return {
      ...baseConfig,
      database: this.config.database.database,
    };
  }
}

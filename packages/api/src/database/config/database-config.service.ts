import { Injectable } from '@nestjs/common';

export interface DatabaseConfig {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  synchronize: boolean;
  logging: boolean;
}

@Injectable()
export class DatabaseConfigService {
  public getConfig(): DatabaseConfig {
    const baseConfig = {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      synchronize: process.env.NODE_ENV !== 'production',
      logging: process.env.NODE_ENV === 'production',
    };

    if (process.env.NODE_ENV === 'test') {
      return this.validateConfig({
        ...baseConfig,
        database: process.env.DB_DATABASE_TEST,
      });
    }

    return this.validateConfig({
      ...baseConfig,
      database: process.env.DB_DATABASE,
    });
  }

  private validateConfig(config: Partial<DatabaseConfig>): DatabaseConfig {
    if (config.host === undefined) throw new Error('Empty database host');
    if (config.port === undefined) throw new Error('Empty database port');
    if (config.username === undefined) throw new Error('Empty database username');
    if (config.password === undefined) throw new Error('Empty database password');
    if (config.database === undefined) throw new Error('Empty database database');
    if (config.synchronize === undefined) throw new Error('Empty database synchronize');
    if (config.logging === undefined) throw new Error('Empty database logging');
    return config as DatabaseConfig;
  }
}

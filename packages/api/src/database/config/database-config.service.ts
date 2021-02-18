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
      host: process.env.DB_HOST || 'postgres',
      port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432,
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres_password',
      synchronize: true,
      logging: process.env.NODE_ENV === 'production',
    };

    if (process.env.NODE_ENV === 'test') {
      return this.validateConfig({
        ...baseConfig,
        database: process.env.DB_DATABASE_TEST || 'smart_gate_db_test',
      });
    }

    return this.validateConfig({
      ...baseConfig,
      database: process.env.DB_DATABASE || 'smart_gate_db',
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

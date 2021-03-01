const { DB_HOST, DB_PORT, DB_DATABASE, DB_USERNAME, DB_PASSWORD, NODE_ENV } = process.env;
const config = {
  type: 'postgres',
  host: DB_HOST,
  port: DB_PORT,
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  entities: ['./src/modules/database/entities/*.entity.ts'],
  migrationsTableName: 'db_migrations',
  migrationsRun: true,
  migrationsTransactionMode: 'each',
  migrations: ['./src/modules/database/migrations/*.ts'],
  cli: { migrationsDir: './src/modules/database/migrations' },
  ssl: NODE_ENV !== 'development',
};

module.exports = config;

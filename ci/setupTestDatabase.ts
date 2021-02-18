import { Client } from 'pg';

interface CreateClientAndConnectParams {
  host: string;
  port: number;
  user: string;
  password: string;
  database?: string;
}

const createClientAndConnect = async ({
  host,
  port,
  user,
  password,
  database,
}: CreateClientAndConnectParams) => {
  const client = new Client({
    host,
    port,
    user,
    password,
    database,
  });

  await client.connect();

  return client;
};

const setupTestDatabase = async (): Promise<void> => {
  const adminClient = await createClientAndConnect({
    host: process.env.DB_HOST || 'localhost',
    port: +(process.env.DB_PORT as string) || 5432,
    user: (process.env.DB_ADMIN_USER as string) || 'sg',
    password: (process.env.DB_ADMIN_PASSWORD as string) || 'sg',
  });

  await adminClient.query('CREATE DATABASE smart_gate_db_test');
  await adminClient.query("CREATE USER sg WITH ENCRYPTED PASSWORD 'sg'");
  await adminClient.query('GRANT ALL PRIVILEGES ON DATABASE smart_gate_db_test TO sg');

  const testDatabaseClient = await createClientAndConnect({
    host: process.env.DB_HOST || 'localhost',
    port: +(process.env.DB_PORT as string) || 5432,
    user: (process.env.DB_ADMIN_USER as string) || 'sg',
    password: (process.env.DB_ADMIN_PASSWORD as string) || 'sg',
    database: 'smart_gate_db_test',
  });

  await testDatabaseClient.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
};

setupTestDatabase()
  .then(() => {
    process.exit();
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

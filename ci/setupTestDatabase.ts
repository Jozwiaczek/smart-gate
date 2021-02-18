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
  const missingVariables = ['DB_ADMIN_USER', 'DB_ADMIN_PASSWORD'].filter(
    (key) => !process.env[key],
  );
  if (missingVariables.length > 0) {
    throw new Error(`Missing environment variables: ${missingVariables.join(', ')}`);
  }

  const adminClient = await createClientAndConnect({
    host: process.env.DB_HOST || 'postgres',
    port: +(process.env.DB_PORT as string) || 5432,
    user: process.env.DB_ADMIN_USER as string,
    password: process.env.DB_ADMIN_PASSWORD as string,
  });

  await adminClient.query('CREATE DATABASE smart_gate_db_test');
  await adminClient.query("CREATE USER sg WITH ENCRYPTED PASSWORD 'sg'");
  await adminClient.query('GRANT ALL PRIVILEGES ON DATABASE smart_gate_db_test TO sg');

  const testDatabaseClient = await createClientAndConnect({
    host: process.env.DB_HOST || 'postgres',
    port: +(process.env.DB_PORT as string) || 5432,
    user: process.env.DB_ADMIN_USER as string,
    password: process.env.DB_ADMIN_PASSWORD as string,
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

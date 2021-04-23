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
  const requiredVariables = [
    'DB_HOST',
    'DB_USERNAME',
    'DB_PASSWORD',
    'DB_DATABASE_TEST',
    'DB_PORT',
  ];
  const missingVariables = requiredVariables.filter((key) => !process.env[key]);
  if (missingVariables.length > 0) {
    throw new Error(`Missing environment variables: ${missingVariables.join(', ')}`);
  }

  const adminClient = await createClientAndConnect({
    host: process.env.DB_HOST as string,
    port: +(process.env.DB_PORT as string),
    user: process.env.DB_USERNAME as string,
    password: process.env.DB_PASSWORD as string,
  });

  await adminClient.query(`CREATE DATABASE ${process.env.DB_DATABASE_TEST}`);

  const testDatabaseClient = await createClientAndConnect({
    host: process.env.DB_HOST as string,
    port: +(process.env.DB_PORT as string),
    user: process.env.DB_USERNAME as string,
    password: process.env.DB_PASSWORD as string,
    database: process.env.DB_DATABASE_TEST,
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

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
  const requiredVariables = ['DB_HOST', 'DB_USERNAME', 'DB_PASSWORD', 'DB_DATABASE_TEST'];
  const missingVariables = requiredVariables.filter((key) => !process.env[key]);
  if (missingVariables.length > 0) {
    throw new Error(`Missing environment variables: ${missingVariables.join(', ')}`);
  }

  const adminClient = await createClientAndConnect({
    host: process.env.DB_HOST,
    port: +(process.env.DB_PORT as string) || 5432,
    user: process.env.DB_USERNAME as string,
    password: process.env.DB_PASSWORD as string,
  });

  await adminClient.query(`CREATE DATABASE ${process.env.DB_DATABASE_TEST}`);
  await adminClient.query(
    `CREATE USER ${process.env.DB_USERNAME} WITH ENCRYPTED PASSWORD '${process.env.DB_PASSWORD}'`,
  );
  await adminClient.query(
    `GRANT ALL PRIVILEGES ON DATABASE ${process.env.DB_DATABASE_TEST} TO ${process.env.DB_USERNAME}`,
  );

  const testDatabaseClient = await createClientAndConnect({
    host: process.env.DB_HOST,
    port: +(process.env.DB_PORT as string) || 5432,
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

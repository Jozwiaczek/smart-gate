import 'dotenv/config';

import { Test } from '@nestjs/testing';
import { Connection } from 'typeorm';

import { DatabaseModule } from '../../src/database/database.module';

export const clearTestDatabase = async (): Promise<void> => {
  const app = await Test.createTestingModule({
    imports: [DatabaseModule],
  }).compile();

  const connection: Connection = app.get(Connection);

  await connection.synchronize(true);
  await connection.close();
};

import 'dotenv/config';

import { clearTestDatabase } from './utils/clearTestDatabase';

export default async () => {
  await clearTestDatabase();
};

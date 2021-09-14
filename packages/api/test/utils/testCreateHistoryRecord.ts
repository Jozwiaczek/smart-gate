import { Connection } from 'typeorm';

import { HistoryEvent } from '../../src/enums/historyEvent.enum';
import { HistoryEntity } from '../../src/modules/database/entities/history.entity';
import { UserEntity } from '../../src/modules/database/entities/user.entity';
import { testCreateRandomUser } from './testCreateRandomUser';

export const testCreateHistoryRecord = async (
  connection: Connection,
  event: HistoryEvent,
  user?: UserEntity,
): Promise<HistoryEntity> => {
  const historyEntity = new HistoryEntity();

  if (event === HistoryEvent.Open) {
    if (user) {
      historyEntity.user = user;
    } else {
      historyEntity.user = await testCreateRandomUser(connection);
    }
  }

  historyEntity.event = event;
  await connection.getRepository(HistoryEntity).save(historyEntity);

  return historyEntity;
};

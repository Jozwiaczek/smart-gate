import { Connection } from 'typeorm';

import { UserEntity } from '../../src/database/entities/user.entity';

export const testCreateRandomUser = async (connection: Connection): Promise<UserEntity> => {
  const userEntity = new UserEntity();
  userEntity.email = `${Date.now()}${Math.random()}@test-email.com`;
  userEntity.password = `${Date.now()}password`;
  await connection.getRepository(UserEntity).save(userEntity);
  return userEntity;
};

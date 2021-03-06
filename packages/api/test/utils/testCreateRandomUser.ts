import { Connection } from 'typeorm';

import { UserEntity } from '../../src/modules/database/entities/user.entity';

export const testCreateRandomUser = async (connection: Connection): Promise<UserEntity> => {
  const userEntity = new UserEntity();
  userEntity.firstName = `${Date.now()}firstName`;
  userEntity.lastName = `${Date.now()}lastName`;
  userEntity.email = `${Date.now()}${Math.random()}@test-email.com`;
  userEntity.password = `${Date.now()}password`;
  await connection.getRepository(UserEntity).save(userEntity);
  return userEntity;
};

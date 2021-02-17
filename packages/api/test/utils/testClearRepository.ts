import { Connection, EntityTarget, Repository } from 'typeorm';

export const testClearRepository = async <T>(
  connection: Connection,
  entity: EntityTarget<T>,
): Promise<Repository<T>> => {
  const repository = connection.getRepository(entity);
  await repository.delete({});

  expect(await repository.count()).toEqual(0);

  return repository;
};

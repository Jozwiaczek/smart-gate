import ms from 'ms';
import { Connection } from 'typeorm';

import { Role } from '../../src/enums/role.enum';
import { InvitationEntity } from '../../src/modules/database/entities/invitation.entity';

export const testCreateRandomInvitation = async (
  connection: Connection,
): Promise<InvitationEntity> => {
  const invitationEntity = new InvitationEntity();
  invitationEntity.email = `${Date.now()}${Math.random()}@test-email.com`;
  invitationEntity.expirationDate = new Date(Date.now() + ms('10 days'));
  invitationEntity.roles = [Role.Admin];
  await connection.getRepository(InvitationEntity).save(invitationEntity);
  return invitationEntity;
};

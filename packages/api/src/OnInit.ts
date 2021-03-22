import { INestApplication } from '@nestjs/common';

import { Role } from './enums/role.enum';
import { Config } from './modules/config/config';
import { InvitationService } from './modules/invitation/invitation.service';
import { InvitationRepository } from './modules/repository/invitation.repository';
import { UserRepository } from './modules/repository/user.repository';

export async function onInit(app: INestApplication) {
  const config = app.get(Config);
  const userRepository = app.get(UserRepository);
  const invitationRepository = app.get(InvitationRepository);
  const invitationService = app.get(InvitationService);

  if (!(await userRepository.count()) && config.superAdminEmails) {
    await invitationRepository.repository.clear();

    config.superAdminEmails.split(';').forEach((email) => {
      invitationService.send({ email: email.trim(), roles: [Role.SuperAdmin] });
    });
  }
}

import { INestApplication } from '@nestjs/common';

import { Config } from './modules/config/config';
import { InvitationsService } from './modules/invitations/invitations.service';
import { InvitationRepository } from './modules/repository/invitation.repository';
import { UserRepository } from './modules/repository/user.repository';
import {
  createTestUser,
  initSentry,
  sendSuperAdminsInvitations,
  sendTestUserInvitation,
} from './utils/onInit.utils';

const onInit = async (app: INestApplication) => {
  const config = app.get(Config);
  const userRepository = app.get(UserRepository);
  const invitationRepository = app.get(InvitationRepository);
  const invitationsService = app.get(InvitationsService);

  await sendSuperAdminsInvitations(
    userRepository,
    invitationRepository,
    invitationsService,
    config,
  );
  await sendTestUserInvitation(invitationsService, invitationRepository, userRepository, config);
  await createTestUser(userRepository, config);
  initSentry(app, config);
};

export default onInit;

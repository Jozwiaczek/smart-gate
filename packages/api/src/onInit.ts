import { INestApplication } from '@nestjs/common';
import * as Sentry from '@sentry/node';
import * as SentryTracing from '@sentry/tracing';
import * as bcrypt from 'bcrypt';

import { Role } from './enums/role.enum';
import { Config } from './modules/config/config';
import { InvitationsService } from './modules/invitations/invitations.service';
import { InvitationRepository } from './modules/repository/invitation.repository';
import { UserRepository } from './modules/repository/user.repository';

const initSentry = (app: INestApplication, config: Config) => {
  Sentry.init({
    dsn: config.sentry.isEnable ? config.sentry.dsn : undefined,
    environment: config.sentry.environment,
    integrations: [
      new Sentry.Integrations.Http({ tracing: true }),
      new SentryTracing.Integrations.Express(),
    ],
    tracesSampleRate: config.sentry.tracesSampleRate,
  });
};

const sendAdminInvitation = async (
  userRepository: UserRepository,
  invitationRepository: InvitationRepository,
  invitationsService: InvitationsService,
  { superAdminEmails }: Config,
) => {
  if (!(await userRepository.count()) && superAdminEmails) {
    await invitationRepository.repository.clear();

    superAdminEmails.split(';').map(async (email) => {
      await invitationsService.send({ email: email.trim(), roles: [Role.SuperAdmin] });
    });
  }
};

const sendTestUserInvitation = async (
  invitationsService: InvitationsService,
  { environment: { isTest }, testUser: { email, password } }: Config,
) => {
  if (isTest && email && password) {
    await invitationsService.send({ email: email.trim(), roles: [Role.Admin] });
  }
};

const onInit = async (app: INestApplication) => {
  const config = app.get(Config);
  const userRepository = app.get(UserRepository);
  const invitationRepository = app.get(InvitationRepository);
  const invitationsService = app.get(InvitationsService);

  await sendAdminInvitation(userRepository, invitationRepository, invitationsService, config);
  await sendTestUserInvitation(invitationsService, config);
  initSentry(app, config);
};

export default onInit;

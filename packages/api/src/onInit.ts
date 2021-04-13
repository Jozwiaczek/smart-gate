import { INestApplication } from '@nestjs/common';
import * as Sentry from '@sentry/node';
import * as SentryTracing from '@sentry/tracing';

import { Role } from './enums/role.enum';
import { Config } from './modules/config/config';
import { InvitationsService } from './modules/invitations/invitations.service';
import { InvitationsRepository } from './modules/repository/invitations.repository';
import { UsersRepository } from './modules/repository/users.repository';

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
  usersRepository: UsersRepository,
  invitationsRepository: InvitationsRepository,
  invitationsService: InvitationsService,
  config: Config,
) => {
  if (!(await usersRepository.count()) && config.superAdminEmails) {
    await invitationsRepository.repository.clear();

    config.superAdminEmails.split(';').forEach((email) => {
      invitationsService.send({ email: email.trim(), roles: [Role.SuperAdmin] });
    });
  }
};

const onInit = async (app: INestApplication) => {
  const config = app.get(Config);
  const userRepository = app.get(UsersRepository);
  const invitationRepository = app.get(InvitationsRepository);
  const invitationService = app.get(InvitationsService);

  await sendAdminInvitation(userRepository, invitationRepository, invitationService, config);
  initSentry(app, config);
};

export default onInit;

import { INestApplication } from '@nestjs/common';
import * as Sentry from '@sentry/node';
import * as SentryTracing from '@sentry/tracing';

import { Role } from './enums/role.enum';
import { Config } from './modules/config/config';
import { InvitationService } from './modules/invitation/invitation.service';
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
  invitationService: InvitationService,
  config: Config,
) => {
  if (!(await userRepository.count()) && config.superAdminEmails) {
    await invitationRepository.repository.clear();

    config.superAdminEmails.split(';').forEach((email) => {
      invitationService.send({ email: email.trim(), roles: [Role.SuperAdmin] });
    });
  }
};

const onInit = async (app: INestApplication) => {
  const config = app.get(Config);
  const userRepository = app.get(UserRepository);
  const invitationRepository = app.get(InvitationRepository);
  const invitationService = app.get(InvitationService);

  await sendAdminInvitation(userRepository, invitationRepository, invitationService, config);
  initSentry(app, config);
};

export default onInit;

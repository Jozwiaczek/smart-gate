import { INestApplication } from '@nestjs/common';
import * as Sentry from '@sentry/node';
import * as SentryTracing from '@sentry/tracing';
import * as bcrypt from 'bcrypt';

import { Role } from '../enums/role.enum';
import { Config } from '../modules/config/config';
import { InvitationsService } from '../modules/invitations/invitations.service';
import { InvitationRepository } from '../modules/repository/invitation.repository';
import { UserRepository } from '../modules/repository/user.repository';

export const initSentry = (app: INestApplication, config: Config) => {
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

export const sendSuperAdminsInvitations = async (
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

export const sendTestUserInvitation = async (
  invitationsService: InvitationsService,
  invitationRepository: InvitationRepository,
  userRepository: UserRepository,
  { environment: { isTest }, testUser: { emailToInvite, password } }: Config,
) => {
  if (isTest && emailToInvite && password) {
    try {
      const existedTestUser = await userRepository.findOneByEmail(emailToInvite);
      if (existedTestUser) {
        await userRepository.deleteById(existedTestUser.id);
      }
      await invitationRepository.repository.clear();
      await invitationsService.send({ email: emailToInvite.trim(), roles: [Role.Admin] });
    } catch (e) {
      console.error(e);
    }
  }
};

export const createTestUser = async (
  userRepository: UserRepository,
  { environment: { isTest }, testUser: { email, password, firstName, lastName } }: Config,
) => {
  try {
    if (isTest && email && password) {
      const existedTestUser = await userRepository.findOneByEmail(email);
      if (existedTestUser) {
        return;
      }

      const salt = await bcrypt.genSalt();
      const hash = await bcrypt.hash(password, salt);

      await userRepository.create({
        password: hash,
        firstName,
        lastName,
        email,
        roles: [Role.Admin],
      });
    }
  } catch (e) {
    console.error(e);
  }
};

import 'dotenv/config';

import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';

import { Role } from './enums/role.enum';
import { AppModule } from './modules/app.module';
import { Config } from './modules/config/config';
import { GlobalExceptionsFilter } from './modules/global-exceptions-filter/global-exceptions-filter';
import { InvitationService } from './modules/invitation/invitation.service';
import { InvitationRepository } from './modules/repository/invitation.repository';
import { UserRepository } from './modules/repository/user.repository';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(Config);

  app.enableCors({
    origin: config.clientUrl,
    credentials: true,
  });
  app.use(cookieParser(config.authSecrets.cookie));
  app.use(helmet());
  app.useGlobalFilters(app.get(GlobalExceptionsFilter));

  await app.listen(config.port || 3030);
  return app;
}

async function onInit(app: INestApplication) {
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

bootstrap().then(onInit);

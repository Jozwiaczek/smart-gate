import 'dotenv/config';

import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';

import { AppModule } from './modules/app.module';
import { Config } from './modules/config/config';
import { SentryInterceptor } from './modules/sentry/sentry.interceptor';
import onInit from './onInit';

const bootstrap = async (): Promise<INestApplication> => {
  const app = await NestFactory.create(AppModule);
  const config = app.get(Config);

  app.enableCors({
    origin: config.clientUrl,
    credentials: true,
  });
  app.use(cookieParser(config.cookie.secret));
  app.use(helmet());
  app.useGlobalInterceptors(app.get(SentryInterceptor));

  await app.listen(config.port || 3030);
  return app;
};

bootstrap()
  .then(onInit)
  .catch((error) => new Error(`NestApp bootstrap error: ${error as string}`));

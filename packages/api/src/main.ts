import 'dotenv/config';

import { NestFactory } from '@nestjs/core';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';

import { AppModule } from './modules/app.module';
import { Config } from './modules/config/config';
import { SentryInterceptor } from './modules/sentry/sentry.interceptor';
import onInit from './onInit';

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);
  const config = app.get(Config);

  app.use(cookieParser(config.cookie.secret));
  app.use(helmet());
  app.useGlobalInterceptors(app.get(SentryInterceptor));

  await app.listen(config.port || 3030);
  return app;
};

bootstrap().then(onInit);

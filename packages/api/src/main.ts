import 'dotenv/config';

import { NestFactory } from '@nestjs/core';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';

import { AppModule } from './modules/app.module';
import { Config } from './modules/config/config';
import { GlobalExceptionsFilter } from './modules/global-exceptions-filter/global-exceptions-filter';
import { onInit } from './OnInit';

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

bootstrap().then(onInit);

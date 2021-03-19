import 'dotenv/config';

import { NestFactory } from '@nestjs/core';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';

import { AllExceptionsFilter } from './modules/all-exceptions-filter/all-exceptions-filter';
import { AppModule } from './modules/app.module';
import { Config } from './modules/config/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(Config);

  app.enableCors({
    origin: [config.clientUrl || 'http://localhost:8080'],
    credentials: true,
  });
  app.use(cookieParser(config.authSecrets.cookie));
  app.use(helmet());
  app.useGlobalFilters(app.get(AllExceptionsFilter));

  await app.listen(config.port || 3030);
}
bootstrap();

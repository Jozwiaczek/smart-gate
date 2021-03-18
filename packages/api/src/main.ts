import 'dotenv/config';

import { NestFactory } from '@nestjs/core';
import cookieParser from 'cookie-parser';
import csurf from 'csurf';
import helmet from 'helmet';

import { AppModule } from './modules/app.module';
import { ConfigLoader } from './modules/config/config-loader';
import { EnvironmentConfigService } from './modules/config/environment-config/environment-config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = await new ConfigLoader(new EnvironmentConfigService()).loadConfig();

  app.enableCors({
    origin: [config.clientUrl || 'http://localhost:8080'],
    credentials: true,
  });
  app.use(cookieParser(config.authSecrets.cookie));
  app.use(helmet());
  app.use(csurf());
  await app.listen(config.port || 3030);
}
bootstrap();

import 'dotenv/config';

import { NestFactory } from '@nestjs/core';
import cookieParser from 'cookie-parser';
import csurf from 'csurf';
import helmet from 'helmet';

import { AppModule } from './modules/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: [
      process.env.CLIENT_URL || 'http://localhost:8080',
      process.env.ADMIN_URL || 'http://localhost:8081',
    ],
    credentials: true,
  });
  app.use(cookieParser(process.env.COOKIE_SECRET));
  app.use(helmet());
  app.use(csurf());
  await app.listen(process.env.PORT || 3030);
}
bootstrap();

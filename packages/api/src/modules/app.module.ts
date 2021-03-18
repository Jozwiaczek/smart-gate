import { Module } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';

import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { MailerModule } from './mailer/mailer.module';
import { RefreshTokenModule } from './refresh-token/refresh-token.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    AuthModule,
    DatabaseModule,
    UsersModule,
    RefreshTokenModule,
    MailerModule,
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
  ],
})
export class AppModule {}

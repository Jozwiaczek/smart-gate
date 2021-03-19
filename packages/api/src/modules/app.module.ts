import { Module } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';

import { AuthModule } from './auth/auth.module';
import { Config } from './config/config';
import { ConfigModule } from './config/config.module';
import { DatabaseModule } from './database/database.module';
import { MailerModule } from './mailer/mailer.module';
import { PasswordResetModule } from './password-reset/password-reset.module';
import { RefreshTokenModule } from './refresh-token/refresh-token.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    AuthModule,
    DatabaseModule,
    UsersModule,
    RefreshTokenModule,
    MailerModule,
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [Config],
      useFactory: (config: Config) => ({
        ttl: config.rateLimiter.maxConcurrent,
        limit: config.rateLimiter.minTime,
      }),
    }),
    PasswordResetModule,
  ],
})
export class AppModule {}

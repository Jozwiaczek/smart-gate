import { Module } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';

import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { InvitationModule } from './invitation/invitation.module';
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
      ttl: parseInt(process.env.RATE_LIMIT_MIN_TIME || '60', 10),
      limit: parseInt(process.env.RATE_LIMIT_MIN_TIME || '10', 10),
    }),
    InvitationModule,
  ],
})
export class AppModule {}

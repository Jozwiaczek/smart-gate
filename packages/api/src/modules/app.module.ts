import { Module } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';

import { AuthModule } from './auth/auth.module';
import { Config } from './config/config';
import { ConfigModule } from './config/config.module';
import { ConfigurationModule } from './configuration/configuration.module';
import { DatabaseModule } from './database/database.module';
import { ExternalIntegrationsModule } from './external-integrations/external-integrations.module';
import { HistoryModule } from './history/history.module';
import { InvitationsModule } from './invitations/invitations.module';
import { MailerModule } from './mailer/mailer.module';
import { PasswordResetModule } from './password-reset/password-reset.module';
import { PushNotificationsModule } from './push-notifications/push-notifications.module';
import { RepositoryModule } from './repository/repository.module';
import { SentryModule } from './sentry/sentry.module';
import { TicketModule } from './ticket/ticket.module';
import { UsersModule } from './users/users.module';
import { WebsocketModule } from './websocket/websocket.module';

@Module({
  imports: [
    AuthModule,
    DatabaseModule,
    UsersModule,
    MailerModule,
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [Config],
      useFactory: (config: Config) => ({
        ttl: config.rateLimiter.maxConcurrent,
        limit: config.rateLimiter.minTime,
      }),
    }),
    SentryModule,
    RepositoryModule,
    InvitationsModule,
    PasswordResetModule,
    RepositoryModule,
    WebsocketModule,
    TicketModule,
    PushNotificationsModule,
    ExternalIntegrationsModule,
    ConfigurationModule,
    HistoryModule,
  ],
})
export class AppModule {}

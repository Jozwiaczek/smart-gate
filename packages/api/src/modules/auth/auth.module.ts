import { Module } from '@nestjs/common';

import { MailerModule } from '../mailer/mailer.module';
import { RepositoryModule } from '../repository/repository.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TokenModule } from './token/token.module';

@Module({
  imports: [MailerModule, RepositoryModule, TokenModule],
  providers: [AuthService],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}

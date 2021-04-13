import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import entities from '../database/entities';
import { InvitationRepository } from './invitation.repository';
import { RefreshTokenRepository } from './refresh-token.repository';
import { UserRepository } from './user.repository';

@Module({
  imports: [TypeOrmModule.forFeature(entities)],
  providers: [UserRepository, InvitationRepository, RefreshTokenRepository],
  exports: [UserRepository, InvitationRepository, RefreshTokenRepository],
})
export class RepositoryModule {}

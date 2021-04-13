import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import entities from '../database/entities';
import { InvitationsRepository } from './invitations.repository';
import { RefreshTokenRepository } from './refresh-token.repository';
import { UsersRepository } from './users.repository';

@Module({
  imports: [TypeOrmModule.forFeature(entities)],
  providers: [UsersRepository, InvitationsRepository, RefreshTokenRepository],
  exports: [UsersRepository, InvitationsRepository, RefreshTokenRepository],
})
export class RepositoryModule {}

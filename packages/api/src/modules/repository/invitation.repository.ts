import { InvitationEntity } from '../database/entities/invitation.entity';
import { BaseRepository } from './base.repository';

export class InvitationRepository extends BaseRepository(InvitationEntity) {}

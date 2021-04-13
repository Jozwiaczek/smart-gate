import { Injectable, NotFoundException } from '@nestjs/common';
import { Connection } from 'typeorm';

import { GetList } from '../../interfaces/react-admin-types';
import { urlEncodedParams } from '../../utils';
import { InvitationEntity } from '../database/entities/invitation.entity';
import { UserEntity } from '../database/entities/user.entity';
import { MailerService } from '../mailer/mailer.service';
import { InvitationRepository } from '../repository/invitation.repository';
import { UserRepository } from '../repository/user.repository';
import { InvitationsConfigService } from './Config/invitations-config.service';
import { CreateInvitationDto } from './dto/create-invitation.dto';
import { UpdateInvitationDto } from './dto/update-invitation.dto';

@Injectable()
export class InvitationsService {
  constructor(
    private readonly connection: Connection,
    private readonly mailerService: MailerService,
    private readonly invitationsConfigService: InvitationsConfigService,
    private readonly invitationRepository: InvitationRepository,
    private readonly userRepository: UserRepository,
  ) {}

  private readonly repository = this.connection.getRepository(InvitationEntity);

  async send(
    { email, roles }: CreateInvitationDto,
    currentUserPromise?: Promise<UserEntity>,
  ): Promise<InvitationEntity> {
    const user = await this.userRepository.findOneByEmail(email);
    if (user) {
      throw new Error(
        `Cannot send invitation because user with email: '${email}' already exists in database.`,
      );
    }

    const expirationDate = this.invitationsConfigService.getExpirationDate();

    let metaDetails = {};
    if (currentUserPromise) {
      metaDetails = {
        createdBy: currentUserPromise,
        updatedBy: currentUserPromise,
      };
    }

    const createdInvitation = await this.invitationRepository.create({
      ...metaDetails,
      email,
      roles,
      expirationDate,
    });

    const link = urlEncodedParams(
      this.invitationsConfigService.getBaseMagicLinkUrl(),
      email,
      createdInvitation.id,
    );

    await this.mailerService.sendInvitation(email, link);

    if (currentUserPromise) {
      const {
        id: currentUserId,
        createdInvitations,
        updatedInvitations,
      } = await currentUserPromise;
      await this.userRepository.update(currentUserId, {
        createdInvitations: [...createdInvitations, createdInvitation],
        updatedInvitations: [...updatedInvitations, createdInvitation],
      });
    }

    return createdInvitation;
  }

  async findAll(): Promise<GetList<InvitationEntity>> {
    const allInvitations = await this.repository.find();
    return { data: allInvitations, total: allInvitations.length };
  }

  async findOne(id: string): Promise<InvitationEntity> {
    return this.repository.findOneOrFail({ id }).catch(() => {
      throw new NotFoundException(`Invitation with id: ${id} not found`);
    });
  }

  async update(
    id: string,
    updateInvitationDto: UpdateInvitationDto,
    currentUserPromise?: Promise<UserEntity>,
  ): Promise<InvitationEntity | undefined> {
    const foundInvitation = await this.findOne(id);

    if (!foundInvitation) {
      throw new NotFoundException(`Invitation with id: ${id} not found`);
    }

    if (updateInvitationDto.roles !== undefined) {
      foundInvitation.roles = updateInvitationDto.roles;
    }

    if (currentUserPromise) {
      const currentUser = await currentUserPromise;
      const currentUpdatedBy = await foundInvitation.updatedBy;

      if (currentUser.id !== currentUpdatedBy.id) {
        foundInvitation.updatedBy = currentUserPromise;
      }
    }

    await this.repository.save(foundInvitation);
    return foundInvitation;
  }

  async remove(id: string): Promise<true> {
    await this.connection
      .createQueryBuilder()
      .delete()
      .from(InvitationEntity)
      .where('id = :id', { id })
      .execute();

    return true;
  }
}

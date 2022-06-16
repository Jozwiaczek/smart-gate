import { Injectable, NotFoundException } from '@nestjs/common';
import { Connection } from 'typeorm';

import { GetList } from '../../interfaces/react-admin-types';
import { urlEncodedParams } from '../../utils';
import getPaginationOptions from '../../utils/getPaginationOptions';
import { InvitationEntity } from '../database/entities/invitation.entity';
import { UserEntity } from '../database/entities/user.entity';
import { MailerService } from '../mailer/mailer.service';
import { InvitationRepository } from '../repository/invitation.repository';
import { UserRepository } from '../repository/user.repository';
import { InvitationsConfigService } from './Config/invitations-config.service';
import { CreateInvitationDto } from './dto/create-invitation.dto';
import { InvitationItemDto } from './dto/invitation-item.dto';
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
    currentUser?: UserEntity,
  ): Promise<InvitationEntity> {
    const user = await this.userRepository.findOneByEmail(email);
    if (user) {
      throw new Error(
        `Cannot send invitation because user with email: '${email}' already exists in database.`,
      );
    }

    const expirationDate = this.invitationsConfigService.getExpirationDate();

    let metaDetails = {};
    if (currentUser) {
      metaDetails = {
        createdBy: currentUser,
        updatedBy: currentUser,
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

    return createdInvitation;
  }

  async findAll(query?: FindQuery): Promise<GetList<InvitationItemDto>> {
    const [invitations, invitationsTotal] = await this.repository.findAndCount({
      relations: ['createdBy', 'updatedBy'],
      ...getPaginationOptions(query),
    });

    const resultInvitation = invitations.map(
      ({
        email,
        id,
        roles,
        expirationDate,
        status,
        createdBy,
        updatedBy,
        createdAt,
        updatedAt,
      }): InvitationItemDto => {
        return {
          id,
          email,
          roles,
          createdAt,
          updatedAt,
          expirationDate,
          status,
          createdBy: createdBy
            ? {
                email: createdBy.email,
                roles: createdBy.roles,
                firstName: createdBy.firstName,
                lastName: createdBy.lastName,
              }
            : undefined,
          updatedBy: updatedBy
            ? {
                email: updatedBy.email,
                roles: updatedBy.roles,
                firstName: updatedBy.firstName,
                lastName: updatedBy.lastName,
              }
            : undefined,
        };
      },
    );

    return { data: resultInvitation, total: invitationsTotal };
  }

  async findOne(id: string): Promise<InvitationEntity> {
    return this.repository.findOneOrFail({ id }).catch(() => {
      throw new NotFoundException(`Invitation with id: ${id} not found`);
    });
  }

  async update(
    id: string,
    updateInvitationDto: UpdateInvitationDto,
    currentUser?: UserEntity,
  ): Promise<InvitationEntity | undefined> {
    const foundInvitation = await this.findOne(id);

    if (!foundInvitation) {
      throw new NotFoundException(`Invitation with id: ${id} not found`);
    }

    if (updateInvitationDto.roles !== undefined) {
      foundInvitation.roles = updateInvitationDto.roles;
    }

    if (currentUser) {
      const currentUpdatedBy = foundInvitation.updatedBy;

      if (currentUser.id !== currentUpdatedBy?.id) {
        foundInvitation.updatedBy = currentUser;
      }
    }

    await this.repository.save(foundInvitation);
    return foundInvitation;
  }

  async removeMany(ids: Array<string>) {
    await this.repository.delete(ids);
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

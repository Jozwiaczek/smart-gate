import { NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { Connection, QueryFailedError } from 'typeorm';

import { clearTestDatabase } from '../../../test/utils/clearTestDatabase';
import { testClearRepository } from '../../../test/utils/testClearRepository';
import { testCreateRandomInvitation } from '../../../test/utils/testCreateRandomInvitation';
import { Role } from '../../enums/role.enum';
import { DatabaseModule } from '../database/database.module';
import { InvitationEntity } from '../database/entities/invitation.entity';
import { MailerModule } from '../mailer/mailer.module';
import { RepositoryModule } from '../repository/repository.module';
import { InvitationsConfigModule } from './Config/invitations-config.module';
import { CreateInvitationDto } from './dto/create-invitation.dto';
import { UpdateInvitationDto } from './dto/update-invitation.dto';
import { InvitationsService } from './invitations.service';

describe('Invitations Service', () => {
  let connection: Connection;
  let invitationsService: InvitationsService;

  beforeEach(async () => {
    await clearTestDatabase();

    const testingModule = await Test.createTestingModule({
      imports: [DatabaseModule, MailerModule, RepositoryModule, InvitationsConfigModule],
      providers: [InvitationsService],
    }).compile();

    connection = testingModule.get(Connection);
    invitationsService = testingModule.get(InvitationsService);
  });

  afterEach(async () => {
    await connection.close();
  });

  describe('send()', () => {
    it('returns valid created invitations', async () => {
      await testClearRepository(connection, InvitationEntity);
      const invitation: CreateInvitationDto = {
        email: 'smart@gate.com',
      };

      await expect(invitationsService.send(invitation)).resolves.toEqual(
        expect.objectContaining(invitation),
      );
    });
  });

  describe('findAll()', () => {
    it('returns empty array if no invitations', async () => {
      await testClearRepository(connection, InvitationEntity);
      const allInvitations = await invitationsService.findAll();

      expect(allInvitations.total).toStrictEqual(0);
      expect(allInvitations.data).toStrictEqual([]);
    });

    it('returns invitations from database', async () => {
      await testClearRepository(connection, InvitationEntity);

      const firstInvitation = await testCreateRandomInvitation(connection);
      const secondInvitation = await testCreateRandomInvitation(connection);

      const allInvitations = await invitationsService.findAll();
      expect(allInvitations.total).toEqual(2);
      expect(allInvitations.data).toStrictEqual([firstInvitation, secondInvitation]);
    });
  });

  describe('findOne()', () => {
    it('rejects with NotFoundException when invitation is not found', async () => {
      await testClearRepository(connection, InvitationEntity);

      await expect(
        invitationsService.findOne('3c3b2ebb-9daa-4f42-85b2-eecc213ca86e'),
      ).rejects.toBeInstanceOf(NotFoundException);
    });

    it('returns invitation with requested id', async () => {
      await testClearRepository(connection, InvitationEntity);

      const invitationEntity = await testCreateRandomInvitation(connection);
      const selectedInvitationEntity = await invitationsService.findOne(invitationEntity.id);

      expect(invitationEntity).toStrictEqual(selectedInvitationEntity);
    });
  });

  describe('create()', () => {
    it('rejects with Exception when invitation with the same email already exists', async () => {
      await testClearRepository(connection, InvitationEntity);
      const randomInvitation = await testCreateRandomInvitation(connection);
      const invitation: CreateInvitationDto = {
        email: randomInvitation.email,
      };

      await expect(invitationsService.send(invitation)).rejects.toBeInstanceOf(QueryFailedError);
    });

    it('returns valid created invitation', async () => {
      await testClearRepository(connection, InvitationEntity);
      const invitation: CreateInvitationDto = {
        email: 'smart@gate.com',
      };

      await expect(invitationsService.send(invitation)).resolves.toEqual(
        expect.objectContaining(invitation),
      );
    });
  });

  describe('update()', () => {
    it('rejects with NotFoundException when invitation has wrong id', async () => {
      const repository = await testClearRepository(connection, InvitationEntity);
      const randomInvitation = await testCreateRandomInvitation(connection);
      const invitation: UpdateInvitationDto = {
        email: randomInvitation.email,
      };

      await expect(repository.count()).resolves.toStrictEqual(1);
      await expect(invitationsService.update(`${Date.now()}`, invitation)).rejects.toBeInstanceOf(
        NotFoundException,
      );
    });

    it('returns valid updated invitation role', async () => {
      const repository = await testClearRepository(connection, InvitationEntity);
      const invitation: CreateInvitationDto = {
        email: 'smart@gate.com',
      };
      const newInvitation = await invitationsService.send(invitation);
      const noChanges = {};
      const nameChange: UpdateInvitationDto = {
        roles: [Role.Admin],
      };

      await expect(repository.count()).resolves.toStrictEqual(1);
      await expect(invitationsService.update(newInvitation.id, noChanges)).resolves.toEqual(
        expect.objectContaining(newInvitation),
      );
      await expect(invitationsService.update(newInvitation.id, nameChange)).resolves.toEqual(
        expect.objectContaining({ ...newInvitation, ...nameChange }),
      );
    });
  });

  describe('remove()', () => {
    it('rejects with Exception when invitation has wrong id', async () => {
      const repository = await testClearRepository(connection, InvitationEntity);
      await testCreateRandomInvitation(connection);

      await expect(repository.count()).resolves.toStrictEqual(1);
      await expect(invitationsService.remove(`${Date.now()}`)).rejects.toBeInstanceOf(
        QueryFailedError,
      );
    });

    it('returns true and remove invitation', async () => {
      const repository = await testClearRepository(connection, InvitationEntity);
      const firstInvitation = await testCreateRandomInvitation(connection);
      const secondInvitation = await testCreateRandomInvitation(connection);

      await expect(repository.find()).resolves.toStrictEqual([firstInvitation, secondInvitation]);
      await expect(invitationsService.remove(firstInvitation.id)).resolves.toStrictEqual(true);
      await expect(repository.find()).resolves.toStrictEqual([secondInvitation]);
      await expect(repository.findOne({ id: firstInvitation.id })).resolves.toStrictEqual(
        undefined,
      );
    });
  });
});

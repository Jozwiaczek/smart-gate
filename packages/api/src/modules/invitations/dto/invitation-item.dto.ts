import { InvitationStatus } from '../../../enums/invitationStatus.enum';
import { Role } from '../../../enums/role.enum';

export interface InvitationUser {
  email: string;
  firstName: string;
  lastName: string;
  roles: Array<Role>;
}

export interface InvitationItemDto {
  id: string;
  createdAt: number;
  updatedAt: number;
  email: string;
  expirationDate: Date;
  status: InvitationStatus;
  roles: Array<Role>;
  createdBy?: InvitationUser;
  updatedBy?: InvitationUser;
}

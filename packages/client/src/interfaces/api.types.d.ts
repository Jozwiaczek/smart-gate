import { InvitationStatus } from '../enums/invitationStatus.enum';
import { Role } from '../enums/role.enum';

interface BaseApiResource {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

interface ApiUser extends BaseApiResource {
  email: string;
  firstName: string;
  lastName: string;
  roles: Array<Role>;
}

interface ApiInvitation extends BaseApiResource {
  email: string;
  expirationDate: Date;
  status: InvitationStatus;
  roles: Array<Role>;
  createdBy?: ApiUser;
  updatedBy?: ApiUser;
}

interface ApiList<T> {
  data: Array<T>;
  total: number;
}

import { HistoryEvent } from '../enums/historyEvent.enum';
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
  externalIntegrationsToken?: string;
}

interface ApiHistoryRecord extends BaseApiResource {
  user?: ApiUser;
  event: HistoryEvent;
}

interface ApiInvitation extends BaseApiResource {
  email: string;
  expirationDate: Date;
  status: InvitationStatus;
  roles: Array<Role>;
  createdBy?: ApiUser;
  updatedBy?: ApiUser;
}

interface ApiListResponse<T> {
  data: Array<T>;
  total: number;
}

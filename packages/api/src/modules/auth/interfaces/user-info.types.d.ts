import { Role } from '../../../enums/role.enum';

export interface UserInfo {
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    roles: Array<Role>;
    createdAt: number;
    updatedAt: number;
    externalIntegrationsToken?: string;
  };
  expirationDate: number;
}

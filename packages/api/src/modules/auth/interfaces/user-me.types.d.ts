import { Role } from '../../../enums/role.enum';

export interface UserMeInfo {
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    roles: Array<Role>;
    createdAt: number;
    updatedAt: number;
  };
  expirationDate: number;
}

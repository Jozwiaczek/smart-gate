import { Role } from '../modules/auth/role.enum';

export interface LoginUserInfo {
  email: string;
  firstName: string;
  lastName: string;
  roles: Array<Role>;
  expirationDate: Date;
}

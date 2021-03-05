import { Role } from '../../../enums/role.enum';

export interface User {
  email: string;
  firstName: string;
  lastName: string;
  roles: Array<Role>;
}

export type CurrentUserContextValue = [
  User | undefined,
  (newUser: User | undefined, expirationDate: number | undefined = undefined) => void,
];

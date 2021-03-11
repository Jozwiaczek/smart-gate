import { ReactNode } from 'react';

import { Role } from '../../../enums/role.enum';

export interface User {
  email: string;
  firstName: string;
  lastName: string;
  roles: Array<Role>;
}

export interface CurrentUserProviderProps {
  children: ReactNode;
}

export type CurrentUserContextValue = [
  User | undefined,
  (newUser: User | undefined, expirationDate: number | undefined = undefined) => void,
];

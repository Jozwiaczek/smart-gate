import { ReactNode } from 'react';

import { ApiUser } from '../../../interfaces/api.types';

export interface CurrentUserProviderProps {
  children: ReactNode;
}

export type CurrentUserContextValue = [
  ApiUser | undefined,
  (newUser: ApiUser | undefined, expirationDate: number | undefined = undefined) => void,
];

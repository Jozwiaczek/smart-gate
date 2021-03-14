import { createContext } from 'react';

import { AuthProps } from './AuthProvider.types';

const defaultValues: AuthProps = {
  checkAuth: () => Promise.resolve(undefined),
  logout: () => {},
  login: () => Promise.resolve(false),
  register: () => Promise.resolve(false),
};

export const AuthContext = createContext<AuthProps>(defaultValues);

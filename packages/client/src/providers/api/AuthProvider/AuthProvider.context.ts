import { createContext } from 'react';

import { AuthProps } from './AuthProvider.types';

const defaultValues: AuthProps = {
  isAuthenticated: () => Promise.resolve(false),
  logout: () => {},
  login: () => Promise.resolve(false),
  register: () => Promise.resolve(false),
  sendPasswordRecoveryEmail: () => Promise.resolve(false),
};

export const AuthContext = createContext<AuthProps>(defaultValues);

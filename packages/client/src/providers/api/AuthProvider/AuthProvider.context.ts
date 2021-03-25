import { createContext } from 'react';

import { AuthProps } from './AuthProvider.types';

const defaultValues: AuthProps = {
  checkAuth: () => Promise.resolve(undefined),
  logout: () => {},
  logoutFromAllDevices: () => {},
  login: () => Promise.resolve(false),
  register: () => Promise.resolve(false),
  sendPasswordRecoveryEmail: () => Promise.resolve(),
  updatePassword: () => Promise.resolve(),
};

export const AuthContext = createContext<AuthProps>(defaultValues);

import { createContext } from 'react';

import { AuthProps } from './AuthProvider.types';

const defaultValues: AuthProps = {
  checkAuth: () => Promise.resolve(undefined),
  logout: () => Promise.resolve(),
  logoutFromAllDevices: () => Promise.resolve(),
  login: () => Promise.resolve(false),
  register: () => Promise.resolve(false),
  sendPasswordRecoveryEmail: () => Promise.resolve(),
  updatePassword: () => Promise.resolve(),
  generateTicket: () => Promise.resolve(''),
};

export const AuthContext = createContext<AuthProps>(defaultValues);

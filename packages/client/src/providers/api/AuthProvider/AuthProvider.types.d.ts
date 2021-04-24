import { ReactNode } from 'react';

import { ApiUser } from '../../../interfaces/api.types';

export interface LoginUserInfo {
  user: ApiUser;
  expirationDate: number;
}

export interface LoginData {
  email: string;
  password: string;
  keepMeLoggedIn: boolean;
}

export interface RegistrationData {
  code: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface AuthProviderProps {
  children: ReactNode;
}

export interface SendPasswordRecoveryEmailData {
  email: string;
}

interface UpdatePasswordData {
  email: string;
  code: string;
  password: string;
}

export interface AuthProps {
  login: (user: LoginData) => Promise<string | boolean>;
  register: (user: RegistrationData) => Promise<string | boolean>;
  checkAuth: () => Promise<ApiUser | undefined>;
  logout: () => Promise<void>;
  logoutFromAllDevices: () => Promise<void>;
  sendPasswordRecoveryEmail: (emailData: SendPasswordRecoveryEmailData) => Promise<void>;
  updatePassword: (user: UpdatePasswordData) => Promise<void>;
}

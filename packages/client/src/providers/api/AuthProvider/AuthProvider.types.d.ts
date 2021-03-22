import { ReactNode } from 'react';

import { User } from '../CurrentUserProvider/CurrentUserProvider.types';

export interface LoginUserInfo {
  user: User;
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
  checkAuth: () => Promise<User | undefined>;
  logout: () => void;
  logoutFromAllDevices: () => void;
  sendPasswordRecoveryEmail: (emailData: SendPasswordRecoveryEmailData) => Promise<boolean>;
  updatePassword: (user: UpdatePasswordData) => Promise<boolean>;
}

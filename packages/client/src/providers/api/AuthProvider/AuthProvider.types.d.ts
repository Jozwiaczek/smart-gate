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
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface AuthProviderProps {
  children: ReactNode;
}

export interface AuthProps {
  login: (user: LoginData) => Promise<string | boolean>;
  register: (user: RegistrationData) => Promise<string | boolean>;
  checkAuth: () => Promise<boolean>;
  logout: () => void;
}

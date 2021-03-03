import { User } from '../UserProvider/UserProvider.types';

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

export interface AuthProps {
  login: (user: LoginData) => Promise<string | boolean>;
  register: (user: RegistrationData) => Promise<string | boolean>;
  isAuthenticated: () => Promise<boolean>;
  logout: () => void;
}

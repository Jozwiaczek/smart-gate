import { Role } from 'api/build/src/modules/auth/role.enum';

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface LoginUserInfo {
  email: string;
  firstName: string;
  lastName: string;
  roles: Array<Role>;
  expirationDate: Date;
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

export interface AuthUser {
  data?: User;
  loading: boolean;
  error?: string;
}

export interface AuthProps {
  getCurrentUser: () => Promise<AuthUser>;
  login: (user: LoginData) => Promise<string | boolean>;
  register: (user: RegistrationData) => Promise<string | boolean>;
  logout: () => void;
}

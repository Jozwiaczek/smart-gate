export interface User {
  firstName?: string;
  lastName?: string;
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
  login: (user: User) => Promise<string | boolean>;
  register: (user: User) => Promise<string | boolean>;
  logout: () => void;
}

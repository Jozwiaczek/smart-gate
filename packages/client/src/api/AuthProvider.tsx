import React, { createContext, PropsWithChildren, useCallback } from 'react';
import useAxios from '../hooks/useAxios';

interface User {
  email: string;
  password: string;
}

interface AuthUser {
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

export const AuthContext = createContext<AuthProps | undefined>(undefined);

const AuthProvider = ({ children }: PropsWithChildren<unknown>) => {
  const axios = useAxios();
  const API_URL = process.env.REACT_APP_API_URL;

  const getCurrentUser = useCallback(async () => {
    let authUser = {
      loading: false,
      user: undefined,
      error: undefined,
    };
    try {
      authUser = await axios.get(`${API_URL}/users/me`);
      // eslint-disable-next-line no-empty
    } catch (ignore) {}

    return authUser;
  }, [axios]);

  const login = useCallback(async (userData: User) => {
    const response = await axios.post(`${API_URL}/auth/login`, { ...userData });
    localStorage.setItem('access_token', response.data.access_token);

    return true;
  }, []);

  const register = useCallback(async (userData?: User) => {
    const response = await axios.post(`${API_URL}/auth/register`, { ...userData });
    localStorage.setItem('access_token', response.data.access_token);

    return true;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('access_token');
  }, []);

  const AuthValue = {
    getCurrentUser,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={AuthValue}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

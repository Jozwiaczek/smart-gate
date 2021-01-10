import React, { createContext, PropsWithChildren, useCallback, useMemo, useState } from 'react';
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
  user?: Promise<AuthUser>;
  login: (user: User) => Promise<string | boolean>;
  register: (user: User) => Promise<string | boolean>;
  logout: (user: User) => string | boolean;
  refetchUser: () => void;
}

export const AuthContext = createContext<AuthProps | undefined>(undefined);

const AuthProvider = ({ children }: PropsWithChildren<unknown>) => {
  const axios = useAxios();
  const [refetch, setRefetch] = useState(false);

  const refetchUser = () => setRefetch((prev) => !prev);

  const user = useMemo(async () => {
    const API_URL = process.env.REACT_APP_API_URL;
    let authUser = {
      loading: false,
      user: undefined,
      error: undefined,
    };
    try {
      authUser = await axios.get(`${API_URL}/users`);
      // eslint-disable-next-line no-empty
    } catch (ignore) {}

    return authUser;
  }, [refetch]);

  const login = useCallback(async (userData: User) => {
    console.trace(userData);
    refetchUser();
    return true;
  }, []);

  const register = useCallback(async (userData: User) => {
    console.trace(userData);
    refetchUser();
    return true;
  }, []);

  const logout = useCallback((userData: User) => {
    console.trace(userData);
    refetchUser();
    return true;
  }, []);

  const AuthValue = {
    user,
    login,
    register,
    logout,
    refetchUser,
  };

  return <AuthContext.Provider value={AuthValue}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

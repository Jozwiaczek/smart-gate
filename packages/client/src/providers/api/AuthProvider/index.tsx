import React, { PropsWithChildren, useCallback } from 'react';

import useAxios from '../../../hooks/useAxios';
import { AuthContext } from './AuthProvider.context';
import { User } from './AuthProvider.types';

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
      authUser = await axios.get(`${API_URL}/users/me`, { withCredentials: true });
      // eslint-disable-next-line no-empty
    } catch (ignore) {}

    return authUser;
  }, [API_URL, axios]);

  const login = useCallback(
    async (userData: User) => {
      const response = await axios.post(
        `${API_URL}/auth/login`,
        { ...userData },
        { withCredentials: true },
      );
      localStorage.setItem('access_token', response.data.access_token);

      return true;
    },
    [API_URL, axios],
  );

  const register = useCallback(
    async (userData?: User) => {
      const response = await axios.post(
        `${API_URL}/auth/register`,
        { ...userData },
        { withCredentials: true },
      );
      localStorage.setItem('access_token', response.data.access_token);
      console.log('response', response);
      return true;
    },
    [API_URL, axios],
  );

  const logout = useCallback(async () => {
    const response = await axios.get(`${API_URL}/auth/logout`, { withCredentials: true });
    return response.data;
  }, [API_URL, axios]);

  const AuthValue = {
    getCurrentUser,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={AuthValue}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

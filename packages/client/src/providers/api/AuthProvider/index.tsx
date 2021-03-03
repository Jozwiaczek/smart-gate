import { AxiosResponse } from 'axios';
import React, { PropsWithChildren, useCallback } from 'react';

import useAxios from '../../../hooks/useAxios';
import { AuthContext } from './AuthProvider.context';
import { LoginData, LoginUserInfo, RegistrationData, User } from './AuthProvider.types';

const AuthProvider = ({ children }: PropsWithChildren<unknown>) => {
  const axios = useAxios();
  console.log('test123');
  const setUser = (loginUserInfo: LoginUserInfo) => {};

  const getCurrentUser = useCallback(async () => {
    let authUser = {
      loading: false,
      user: undefined,
      error: undefined,
    };
    try {
      authUser = await axios.get('/users/me');
      // eslint-disable-next-line no-empty
    } catch (ignore) {}

    return authUser;
  }, [axios]);

  const login = useCallback(
    async (userData: LoginData) => {
      const response = await axios.post<LoginData, AxiosResponse<LoginUserInfo>>(
        '/auth/login',
        userData,
      );

      setUser(response.data);

      return true;
    },
    [axios],
  );

  const register = useCallback(
    async (userData?: RegistrationData) => {
      const response = await axios.post<RegistrationData, AxiosResponse<LoginUserInfo>>(
        '/auth/register',
        { ...userData },
      );

      setUser(response.data);

      return true;
    },
    [axios],
  );

  const logout = useCallback(async () => {
    const response = await axios.get('/auth/logout');
    return response.data;
  }, [axios]);

  const AuthValue = {
    getCurrentUser,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={AuthValue}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

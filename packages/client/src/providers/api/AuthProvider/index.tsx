import { AxiosResponse } from 'axios';
import React, { PropsWithChildren, useCallback } from 'react';

import { useCurrentUser } from '../../../hooks';
import useAxios from '../../../hooks/useAxios';
import useLocalStorage from '../../../hooks/useLocalStorage';
import { AuthContext } from './AuthProvider.context';
import { LoginData, LoginUserInfo, RegistrationData } from './AuthProvider.types';

const AuthProvider = ({ children }: PropsWithChildren<unknown>) => {
  const axios = useAxios();
  const [currentUser, setUser] = useCurrentUser();
  const [expiration] = useLocalStorage('loginExpirationDate', undefined);

  const isAuthenticated = useCallback(async () => {
    if (currentUser) {
      return true;
    }
    if (expiration) {
      return axios
        .get<never, AxiosResponse<LoginUserInfo>>('/auth/me')
        .then(({ data: { user, expirationDate } }) => {
          setUser(user, expirationDate);
          return true;
        })
        .catch(() => {
          return false;
        });
    }
    return false;
  }, [axios, expiration, currentUser, setUser]);

  const login = useCallback(
    async (userData: LoginData) => {
      const {
        data: { user, expirationDate },
      } = await axios.post<LoginData, AxiosResponse<LoginUserInfo>>('/auth/login', userData);

      setUser(user, expirationDate);
      return true;
    },
    [axios, setUser],
  );

  const register = useCallback(
    async (userData?: RegistrationData) => {
      const {
        data: { user, expirationDate },
      } = await axios.post<RegistrationData, AxiosResponse<LoginUserInfo>>('/auth/register', {
        ...userData,
      });

      setUser(user, expirationDate);
      return true;
    },
    [axios, setUser],
  );

  const logout = useCallback(async () => {
    const response = await axios.get('/auth/logout');
    setUser(undefined);
    return response.data;
  }, [axios, setUser]);

  const AuthValue = {
    login,
    register,
    logout,
    isAuthenticated,
  };

  return <AuthContext.Provider value={AuthValue}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

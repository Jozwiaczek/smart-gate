import { AxiosResponse } from 'axios';
import React, { useCallback } from 'react';

import { localStorageKeys } from '../../../constants';
import { useCurrentUser } from '../../../hooks';
import useAxios from '../../../hooks/useAxios';
import useLocalStorage from '../../../hooks/useLocalStorage';
import { AuthContext } from './AuthProvider.context';
import {
  AuthProps,
  AuthProviderProps,
  LoginData,
  LoginUserInfo,
  RegistrationData,
} from './AuthProvider.types';

const AuthProvider = ({ children }: AuthProviderProps) => {
  const axios = useAxios();
  const [currentUser, setCurrentUser] = useCurrentUser();
  const [expiration] = useLocalStorage(localStorageKeys.LOGIN_EXPIRATION_DATE, undefined);

  const checkAuth = useCallback(async () => {
    if (currentUser) {
      return currentUser;
    }
    if (expiration) {
      return axios
        .get<never, AxiosResponse<LoginUserInfo>>('/auth/me')
        .then(({ data: { user, expirationDate } }) => {
          setCurrentUser(user, expirationDate);
          return user;
        })
        .catch(() => {
          setCurrentUser(undefined);
          return undefined;
        });
    }
    setCurrentUser(undefined);
    return undefined;
  }, [axios, expiration, currentUser, setCurrentUser]);

  const login = useCallback(
    async (userData: LoginData) => {
      const {
        data: { user, expirationDate },
      } = await axios.post<LoginData, AxiosResponse<LoginUserInfo>>('/auth/login', userData);

      setCurrentUser(user, expirationDate);
      return true;
    },
    [axios, setCurrentUser],
  );

  const register = useCallback(
    async (userData?: RegistrationData) => {
      const {
        data: { user, expirationDate },
      } = await axios.post<RegistrationData, AxiosResponse<LoginUserInfo>>('/auth/register', {
        ...userData,
      });

      setCurrentUser(user, expirationDate);
      return true;
    },
    [axios, setCurrentUser],
  );

  const logout = useCallback(async () => {
    const response = await axios.get('/auth/logout');
    setCurrentUser(undefined);
    return response.data;
  }, [axios, setCurrentUser]);

  const AuthValue: AuthProps = {
    login,
    register,
    logout,
    checkAuth,
  };

  return <AuthContext.Provider value={AuthValue}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

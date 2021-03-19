import { AxiosResponse } from 'axios';
import React, { useCallback } from 'react';

import { useCurrentUser, useLocalStorageMemory } from '../../../hooks';
import useAxios from '../../../hooks/useAxios';
import { AuthContext } from './AuthProvider.context';
import {
  AuthProps,
  AuthProviderProps,
  LoginData,
  LoginUserInfo,
  RegistrationData,
  SendPasswordRecoveryEmailData,
  UpdatePasswordData,
} from './AuthProvider.types';

const AuthProvider = ({ children }: AuthProviderProps) => {
  const axios = useAxios();
  const [currentUser, setCurrentUser] = useCurrentUser();
  const [getExpiration] = useLocalStorageMemory('loginExpirationDate');

  const checkAuth = useCallback(async () => {
    if (currentUser) {
      return currentUser;
    }
    const expiration = getExpiration();
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
  }, [axios, currentUser, getExpiration, setCurrentUser]);

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

  const logoutFromAllDevices = useCallback(async () => {
    const response = await axios.get('/auth/logoutFromAllDevices');
    setCurrentUser(undefined);
    return response.data;
  }, [axios, setCurrentUser]);

  const sendPasswordRecoveryEmail = useCallback(
    async (emailData: SendPasswordRecoveryEmailData) => {
      await axios.post('/passwordReset/create', emailData);
      console.log('sendPasswordRecoveryEmail:', emailData);
      return false;
    },
    [axios],
  );

  const updatePassword = useCallback(
    async (userData: UpdatePasswordData) => {
      await axios.post('/passwordReset/recover', userData);
      console.log('updatePassword:', userData);
      return false;
    },
    [axios],
  );

  const AuthValue: AuthProps = {
    login,
    register,
    logout,
    logoutFromAllDevices,
    checkAuth,
    sendPasswordRecoveryEmail,
    updatePassword,
  };

  return <AuthContext.Provider value={AuthValue}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

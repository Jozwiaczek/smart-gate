import axios, { AxiosError } from 'axios';
import React from 'react';

import { environments } from '../../../constants';
import { useCurrentUser } from '../../../hooks';
import { AxiosContext } from './AxiosProvider.context';
import { AxiosProviderProps } from './AxiosProvider.types';

const AxiosProvider = ({ children }: AxiosProviderProps) => {
  const [, setUser] = useCurrentUser();

  const { REACT_APP_API_URL, NODE_ENV } = process.env;

  const AxiosOverriddenInstance = axios.create({
    baseURL: NODE_ENV === environments.DEV ? REACT_APP_API_URL : '/api',
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  });

  AxiosOverriddenInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error: AxiosError) => {
      if (error && error.response && error.response.status === 401) {
        setUser(undefined);
      }
      return Promise.reject(error);
    },
  );

  return <AxiosContext.Provider value={AxiosOverriddenInstance}>{children}</AxiosContext.Provider>;
};

export default AxiosProvider;

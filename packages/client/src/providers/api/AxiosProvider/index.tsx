import axios, { AxiosError } from 'axios';
import React from 'react';

import { environments } from '../../../constants';
import { useCurrentUser } from '../../../hooks';
import { AxiosContext } from './AxiosProvider.context';
import { AxiosProviderProps } from './AxiosProvider.types';

const getBaseURL = (): string => {
  const { REACT_APP_API_URL, NODE_ENV, REACT_APP_FORCE_API_URL } = process.env;

  if (NODE_ENV === environments.DEV || REACT_APP_FORCE_API_URL === 'true') {
    if (!REACT_APP_API_URL) {
      throw new Error('Missing "REACT_APP_API_URL" env variable');
    }
    return REACT_APP_API_URL;
  }

  return '/api';
};

const AxiosProvider = ({ children }: AxiosProviderProps) => {
  const [, setUser] = useCurrentUser();

  const AxiosOverriddenInstance = axios.create({
    baseURL: getBaseURL(),
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  });

  AxiosOverriddenInstance.interceptors.response.use(
    (response) => response,
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

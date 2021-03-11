import axios, { AxiosError } from 'axios';
import React, { PropsWithChildren, ReactNode } from 'react';

import { useCurrentUser } from '../../../hooks';
import { AxiosContext } from './AxiosProvider.context';

const AxiosProvider = ({ children }: { children: ReactNode }) => {
  const API_URL = process.env.REACT_APP_API_URL;
  const [, setUser] = useCurrentUser();

  const AxiosOverriddenInstance = axios.create({
    baseURL: API_URL,
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

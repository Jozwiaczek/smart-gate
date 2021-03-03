import axios, { AxiosError } from 'axios';
import React, { PropsWithChildren } from 'react';

import useUser from '../../../hooks/useUser';
import { AxiosContext } from './AxiosProvider.context';

const AxiosProvider = ({ children }: PropsWithChildren<unknown>) => {
  const API_URL = process.env.REACT_APP_API_URL;
  const { setUser } = useUser();

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

import axios from 'axios';
import React, { PropsWithChildren } from 'react';

import { AxiosContext } from './AxiosProvider.context';

const AxiosProvider = ({ children }: PropsWithChildren<unknown>) => {
  const API_URL = process.env.REACT_APP_API_URL;

  const AxiosOverriddenInstance = axios.create({
    baseURL: API_URL,
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  });

  return <AxiosContext.Provider value={AxiosOverriddenInstance}>{children}</AxiosContext.Provider>;
};

export default AxiosProvider;

import axios, { AxiosInstance } from 'axios';
import React, { createContext, PropsWithChildren, useMemo } from 'react';

export const AxiosContext = createContext<AxiosInstance>(axios);

const AxiosProvider = ({ children }: PropsWithChildren<unknown>) => {
  const AxiosOverriddenInstance = useMemo(() => {
    const axiosConfig = axios.create({
      headers: {
        'Content-Type': 'application/json',
      },
    });

    axiosConfig.interceptors.request.use((config) => {
      const token = localStorage.getItem('access_token');
      const overriddenConfig = config;
      if (token) {
        overriddenConfig.headers.Authorization = `Bearer ${token}`;
      }

      return overriddenConfig;
    });

    return axiosConfig;
  }, []);

  return <AxiosContext.Provider value={AxiosOverriddenInstance}>{children}</AxiosContext.Provider>;
};

export default AxiosProvider;

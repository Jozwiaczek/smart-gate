import React, { createContext, PropsWithChildren, useMemo } from 'react';
import axios, { AxiosInstance } from 'axios';

export const AxiosContext = createContext<AxiosInstance>(axios);

const AxiosProvider = ({ children }: PropsWithChildren<unknown>) => {
  const AxiosOverriddenInstance = useMemo(() => {
    const axiosConfig = axios.create({
      headers: {
        'Content-Type': 'application/json',
      },
    });

    axiosConfig.interceptors.request.use((config) => {
      // Read token for anywhere, in this case directly from localStorage
      const token = localStorage.getItem('token');
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

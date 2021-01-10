import React, { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

// Create a client
const queryClient = new QueryClient();

interface ApiProviderProps {
  children: ReactNode;
}

const ApiProvider = ({ children }: ApiProviderProps) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

export default ApiProvider;

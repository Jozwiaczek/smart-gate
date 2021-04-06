import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import { useAxios } from '../../../hooks';
import { DefaultQueryFn, ReactQueryProviderProps } from './ReactQueryProvider';

const ReactQueryProvider = ({ children }: ReactQueryProviderProps) => {
  const axios = useAxios();
  const defaultQueryFn = async ({ queryKey }: DefaultQueryFn) => {
    const { data } = await axios.get(queryKey[0]);
    return data;
  };

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        queryFn: defaultQueryFn,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
};

export default ReactQueryProvider;

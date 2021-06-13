import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import { useAxios } from '../../../hooks';
import {
  DefaultQueryFn,
  DefaultQueryFnResult,
  ReactQueryProviderProps,
} from './ReactQueryProvider';

const ReactQueryProvider = ({ children }: ReactQueryProviderProps) => {
  const axios = useAxios();
  const defaultQueryFn = async ({ queryKey }: DefaultQueryFn) => {
    const { data } = await axios.get<DefaultQueryFnResult>(
      Array.isArray(queryKey) ? queryKey[0] : queryKey,
    );
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

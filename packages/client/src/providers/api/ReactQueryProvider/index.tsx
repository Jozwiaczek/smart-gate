import React, { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import { useAxios } from '../../../hooks';

const ReactQueryProvider = ({ children }: { children: ReactNode }) => {
  const axios = useAxios();
  const defaultQueryFn = async ({ queryKey }: { queryKey: string }) => {
    const { data } = await axios.get(queryKey[0]);
    return data.data;
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

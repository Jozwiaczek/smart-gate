import { ReactNode } from 'react';

interface DefaultQueryFn {
  queryKey: string | readonly unknown[];
}

interface ReactQueryProviderProps {
  children: ReactNode;
}

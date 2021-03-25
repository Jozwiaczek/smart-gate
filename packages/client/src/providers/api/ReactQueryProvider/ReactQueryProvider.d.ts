import { ReactNode } from 'react';

interface DefaultQueryFn {
  queryKey: string;
}

interface ReactQueryProviderProps {
  children: ReactNode;
}

import { ReactNode } from 'react';

interface DefaultQueryFn {
  queryKey: string | readonly unknown[];
}

interface DefaultQueryFnResult {
  data: unknown;
}

interface ReactQueryProviderProps {
  children: ReactNode;
}

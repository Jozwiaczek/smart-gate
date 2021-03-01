import { createContext } from 'react';

import { SnackbarContextValue } from './SnackbarProvider.types';

export const SnackbarContext = createContext<SnackbarContextValue>({
  showSnackbar: () => {},
});

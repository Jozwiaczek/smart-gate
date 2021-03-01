import { ReactNode } from 'react';

import { SnackbarSeverity } from '../../elements/Snackbar/Snackbar.types';

export interface ShowSnackbarProps {
  message: string;
  severity?: SnackbarSeverity;
  duration?: number;
}

export interface SnackbarProviderProps {
  children: ReactNode;
}

export interface SnackbarContextValue {
  showSnackbar: (props: ShowSnackbarProps) => void;
}

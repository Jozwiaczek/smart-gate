import { FC, ReactNode } from 'react';

import { SnackbarSeverity } from '../../elements/Snackbar/Snackbar.types';

export interface ShowSnackbarProps {
  message: string;
  leftAdornment?: FC;
  severity?: SnackbarSeverity;
  duration?: number;
}

export interface SnackbarProviderProps {
  children: ReactNode;
}

export interface SnackbarContextValue {
  showSnackbar: (props: ShowSnackbarProps) => void;
}

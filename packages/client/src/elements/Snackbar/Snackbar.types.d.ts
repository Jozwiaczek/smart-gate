import { ReactNode } from 'react';

export interface SnackbarProps {
  children: ReactNode;
  open: boolean;
  onClose: () => void;
  severity: SnackbarSeverity;
}

export type SnackbarSeverity = 'info' | 'error' | 'success' | 'warning';

export interface SnackbarWrapperProps {
  open?: boolean;
  severity: SnackbarSeverity;
}

export interface CloseButtonProps {
  severity: SnackbarSeverity;
}

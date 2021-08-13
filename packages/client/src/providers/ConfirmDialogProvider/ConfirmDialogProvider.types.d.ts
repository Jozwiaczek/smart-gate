import { ReactNode } from 'react';

interface OpenConfirmDialogOptions {
  title: string;
  description: string;
  onConfirm: () => unknown | Promise<unknown>;
  onCancel?: () => void;
  confirmButton?: ReactNode;
  cancelButton?: ReactNode;
}

interface ConfirmDialogProviderProps {
  children: ReactNode;
}

interface ConfirmDialogContextValue {
  open: (options: OpenConfirmDialogOptions) => () => void;
}

interface ActionButtonProps {
  callback: () => void;
  overwrittenBtn: ReactNode | undefined;
}

import { ReactNode } from 'react';

interface DialogProps {
  children?: ReactNode;
  isOpen: boolean;
  close: () => void;
  title?: string;
  description?: string;
}

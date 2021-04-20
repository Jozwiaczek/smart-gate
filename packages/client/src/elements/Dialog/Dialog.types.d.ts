import { ReactNode } from 'react';

interface DialogProps {
  children: ReactNode;
  open: boolean;
  onClose: () => void;
}

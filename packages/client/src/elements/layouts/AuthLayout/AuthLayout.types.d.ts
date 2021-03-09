import { ReactNode } from 'react';

export interface AuthLayoutProps {
  children: ReactNode;
}

export interface ActionsContainerProps {
  direction?: 'column' | 'row';
  children: ReactNode;
}

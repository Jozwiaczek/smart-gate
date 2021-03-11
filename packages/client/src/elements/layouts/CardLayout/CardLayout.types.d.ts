import { ReactNode } from 'react';

export interface CardLayoutProps {
  children: ReactNode;
}

export interface ActionsContainerProps {
  direction?: 'column' | 'row';
  children: ReactNode;
}

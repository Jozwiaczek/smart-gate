import { ReactNode } from 'react';

export interface CardLayoutProps {
  children: ReactNode;
}

export interface ActionsContainerProps {
  direction?: 'column' | 'row';
  children: ReactNode;
}

export interface TitleProps {
  children: ReactNode;
}

export interface DescriptionProps {
  children: ReactNode;
}

import { ReactNode } from 'react';

export type LinkColor = 'primary' | 'text';

export interface LinkProps {
  color?: LinkColor;
  asOuterLink?: boolean;
  to: string;
  children: ReactNode;
}

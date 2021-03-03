import { ReactNode } from 'react';

export interface AnimatedProps {
  children?: ReactNode;
  animateIn?: string;
  animateOut?: string;
}

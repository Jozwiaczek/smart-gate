import { ButtonHTMLAttributes, ReactNode } from 'react';

type IconButtonColor = 'primary' | 'secondary';

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  color?: IconButtonColor;
}

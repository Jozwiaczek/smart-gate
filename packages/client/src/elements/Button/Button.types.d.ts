import { ButtonHTMLAttributes } from 'react';

type ButtonColor = 'primary' | 'secondary';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  color?: ButtonColor;
  fullWidth?: boolean;
  margin?: string;
  to?: string;
}

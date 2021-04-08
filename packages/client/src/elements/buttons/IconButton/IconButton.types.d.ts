import { ButtonHTMLAttributes } from 'react';

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  to?: string;
  size?: number;
}

interface StyledButtonProps {
  color: string;
  size?: number;
}

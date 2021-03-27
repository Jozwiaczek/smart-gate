import { ButtonHTMLAttributes } from 'react';

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  to?: string;
}

interface StyledButtonProps {
  color: string;
}

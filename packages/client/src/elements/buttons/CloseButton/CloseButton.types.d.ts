import { ButtonHTMLAttributes } from 'react';

interface CloseButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: string;
  color?: string;
}

interface StyledCloseButtonProps {
  size: string;
  color: string;
}

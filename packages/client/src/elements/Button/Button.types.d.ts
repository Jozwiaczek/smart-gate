import { ButtonHTMLAttributes } from 'react';

import { ThemeType } from '../../theme/Theme';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  colorVariant?: ThemeType;
  fullWidth?: boolean;
  margin?: string;
  to?: string;
  withArrow?: boolean;
}

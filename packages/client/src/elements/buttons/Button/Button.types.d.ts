import { ButtonHTMLAttributes } from 'react';

import { ITheme, ThemeType } from '../../../theme/Theme';

type ButtonColorVariant = ThemeType | 'red' | 'blue' | 'card';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  loading?: boolean;
  colorVariant?: ButtonColorVariant;
  fullWidth?: boolean;
  margin?: string;
  to?: string;
  withArrow?: boolean;
}

interface HelperStyledFunction {
  palette: ITheme.palette;
  colorVariant?: ButtonColorVariant;
}

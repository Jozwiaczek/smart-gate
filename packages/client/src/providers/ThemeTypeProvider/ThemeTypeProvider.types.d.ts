import { ReactNode } from 'react';

import { ThemeType } from '../../theme/Theme';

export interface ThemeTypeContextValue {
  themeType: ThemeType;
  setThemeType: (themeType: ThemeType) => void;
  setSystemThemeType: () => void;
  cleanThemeType: () => void;
}

export interface ThemeProviderProps {
  children: ReactNode;
}

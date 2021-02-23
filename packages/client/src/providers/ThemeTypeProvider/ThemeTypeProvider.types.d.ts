import { ReactNode } from 'react';

import { ThemeType } from '../../theme/Theme';

export interface ThemeTypeContextValue {
  themeType: ThemeType;
  setThemeType: (themeType: ThemeType) => void;
}

export interface ThemeProviderProps {
  children: ReactNode;
  themeType?: ThemeType;
}

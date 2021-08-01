import { ReactNode } from 'react';

import { StoredThemeType, ThemeType } from '../../theme/Theme';

interface ThemeTypeContextValue {
  themeType: ThemeType;
  storedThemeType: StoredThemeType;
  setThemeType: (themeType: StoredThemeType) => void;
  cleanThemeType: () => void;
}

interface ThemeProviderProps {
  children: ReactNode;
}

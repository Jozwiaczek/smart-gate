import React, { createContext, useMemo } from 'react';

import useLocalStorage from '../../hooks/useLocalStorage/useLocalStorage';
import { StoredThemeType, ThemeType } from '../../theme/Theme';
import { ThemeProviderProps, ThemeTypeContextValue } from './ThemeTypeProvider.types';

export const ThemeTypeContext = createContext<ThemeTypeContextValue>({
  themeType: ThemeType.dark,
  storedThemeType: StoredThemeType.dark,
  setThemeType: () => null,
  cleanThemeType: () => null,
});

const ThemeTypeProvider = ({ children }: ThemeProviderProps) => {
  const isSystemDarkTheme = window.matchMedia('(prefers-color-scheme: dark)');
  const [storedThemeType, setThemeType, cleanThemeType] = useLocalStorage<StoredThemeType>(
    'themeType',
    StoredThemeType.dark,
  );

  const themeType = useMemo(() => {
    switch (storedThemeType) {
      case StoredThemeType.dark: {
        return ThemeType.dark;
      }
      case StoredThemeType.light: {
        return ThemeType.light;
      }
      case StoredThemeType.system: {
        if (isSystemDarkTheme) {
          return ThemeType.dark;
        }
        return ThemeType.light;
      }
      default: {
        return ThemeType.dark;
      }
    }
  }, [isSystemDarkTheme, storedThemeType]);

  return (
    <ThemeTypeContext.Provider value={{ themeType, storedThemeType, setThemeType, cleanThemeType }}>
      {children}
    </ThemeTypeContext.Provider>
  );
};

export default ThemeTypeProvider;

import React, { createContext, useEffect, useMemo } from 'react';

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

  useEffect(() => {
    const themeColorMetaTag = document.querySelector('meta[name="theme-color"]');
    if (!themeColorMetaTag) {
      return;
    }

    if (themeType === ThemeType.light) {
      themeColorMetaTag.setAttribute('content', '#efefef');
    }
    if (themeType === ThemeType.dark) {
      themeColorMetaTag.setAttribute('content', '#22343C');
    }
  }, [themeType]);

  const contextValue: ThemeTypeContextValue = useMemo(
    () => ({ themeType, storedThemeType, setThemeType, cleanThemeType }),
    [cleanThemeType, setThemeType, storedThemeType, themeType],
  );

  return <ThemeTypeContext.Provider value={contextValue}>{children}</ThemeTypeContext.Provider>;
};

export default ThemeTypeProvider;

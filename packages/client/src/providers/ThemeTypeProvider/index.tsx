import React, { useEffect } from 'react';

import useLocalStorage from '../../hooks/useLocalStorage/useLocalStorage';
import { ThemeType } from '../../theme/Theme';
import { ThemeTypeContext } from './ThemeTypeProvider.context';
import { ThemeProviderProps } from './ThemeTypeProvider.types';

const ThemeTypeProvider = ({ children }: ThemeProviderProps) => {
  const isSystemDarkTheme = window.matchMedia('(prefers-color-scheme: dark)');
  const [themeType, setThemeType, cleanThemeType] = useLocalStorage<ThemeType>(
    'themeType',
    ThemeType.dark,
  );

  const setSystemThemeType = () => {
    setThemeType(isSystemDarkTheme ? ThemeType.dark : ThemeType.light);
  };

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

  return (
    <ThemeTypeContext.Provider
      value={{ themeType, setThemeType, setSystemThemeType, cleanThemeType }}
    >
      {children}
    </ThemeTypeContext.Provider>
  );
};

export default ThemeTypeProvider;

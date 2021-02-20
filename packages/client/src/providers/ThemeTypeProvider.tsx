import React, { createContext, ReactNode, useState } from 'react';

import useLocalStorage from '../hooks/useLocalStorage';
import { ThemeType } from '../theme/Theme';

export interface ThemeTypeContextValue {
  themeType: ThemeType;
  setThemeType: (themeType: ThemeType) => void;
}

export const ThemeTypeContext = createContext<ThemeTypeContextValue>({
  themeType: ThemeType.light,
  setThemeType: () => null,
});

interface ThemeProviderProps {
  children: ReactNode;
  themeType?: ThemeType;
}

const ThemeTypeProvider = ({ themeType, children }: ThemeProviderProps) => {
  const isSystemDarkTheme = window.matchMedia('(prefers-color-scheme: dark)');
  const [localStorageType, setLocalStorageType] = useLocalStorage<ThemeType>('themeType');
  const defaultType =
    localStorageType || themeType || isSystemDarkTheme ? ThemeType.dark : ThemeType.light;
  const [internalType, setInternalType] = useState<ThemeType>(defaultType);

  const setThemeType = (themeTypeParam: ThemeType) => {
    setInternalType(themeTypeParam);
    setLocalStorageType(themeTypeParam);
  };

  return (
    <>
      <ThemeTypeContext.Provider value={{ themeType: internalType, setThemeType }}>
        {children}
      </ThemeTypeContext.Provider>
    </>
  );
};

export default ThemeTypeProvider;

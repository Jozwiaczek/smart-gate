import React, { createContext, ReactNode } from 'react';

export interface ThemeTypeContextValue {
  type: 'light' | 'dark';
}

export const ThemeTypeContext = createContext<ThemeTypeContextValue>({
  type: 'light',
});

interface ThemeProviderProps {
  children: ReactNode;
}

const ThemeTypeProvider = ({ children }: ThemeProviderProps) => {
  return (
    <>
      <ThemeTypeContext.Provider value={{ type: 'light' }}>{children}</ThemeTypeContext.Provider>
    </>
  );
};

export default ThemeTypeProvider;

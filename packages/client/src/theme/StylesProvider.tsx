import React, { ReactNode } from 'react';
import { ThemeProvider } from 'styled-components';

import { useThemeType } from '../hooks';
import ThemeTypeProvider from '../providers/ThemeTypeProvider';
import DefaultLayout from './DefaultLayout';
import GlobalStyles from './GlobalStyles';
import { getTheme } from './Theme';

interface StylesProviderProps {
  children: ReactNode;
}

const InnerStylesProvider = ({ children }: StylesProviderProps) => {
  const { themeType } = useThemeType();

  return (
    <ThemeProvider theme={getTheme(themeType)}>
      <GlobalStyles />
      <DefaultLayout>{children}</DefaultLayout>
    </ThemeProvider>
  );
};

const StylesProvider = ({ children }: StylesProviderProps) => (
  <ThemeTypeProvider>
    <InnerStylesProvider>{children}</InnerStylesProvider>
  </ThemeTypeProvider>
);

export default StylesProvider;

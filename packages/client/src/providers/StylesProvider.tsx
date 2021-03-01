import React, { ReactNode } from 'react';
import { ThemeProvider } from 'styled-components';

import { useThemeType } from '../hooks';
import DefaultLayout from '../theme/DefaultLayout';
import GlobalStyles from '../theme/GlobalStyles';
import { getTheme } from '../theme/Theme';
import ThemeTypeProvider from './ThemeTypeProvider';

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

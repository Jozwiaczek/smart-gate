import React, { ReactNode } from 'react';
import { ThemeProvider } from 'styled-components';
import DefaultLayout from './DefaultLayout';
import GlobalStyles from './GlobalStyles';
import DefaultTheme from './Theme';

interface StylesProviderProps {
  children: ReactNode;
}

const StylesProvider = ({ children }: StylesProviderProps) => (
  <ThemeProvider theme={DefaultTheme}>
    <GlobalStyles />
    <DefaultLayout>{children}</DefaultLayout>
  </ThemeProvider>
);

export default StylesProvider;

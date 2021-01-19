import React, { ReactNode } from 'react';
import { CssBaseline, MuiThemeProvider } from '@material-ui/core';
import { StylesProvider as SCStylesProvider } from '@material-ui/core/styles';
import { ThemeProvider } from 'styled-components';
import DefaultLayout from './DefaultLayout';
import GlobalStyles from './GlobalStyles';
import DefaultTheme from './Theme';

interface StylesProviderProps {
  children: ReactNode;
}

const StylesProvider = ({ children }: StylesProviderProps) => (
  <SCStylesProvider injectFirst>
    <MuiThemeProvider theme={DefaultTheme}>
      <ThemeProvider theme={DefaultTheme}>
        <GlobalStyles />
        <DefaultLayout>
          <CssBaseline />
          {children}
        </DefaultLayout>
      </ThemeProvider>
    </MuiThemeProvider>
  </SCStylesProvider>
);

export default StylesProvider;

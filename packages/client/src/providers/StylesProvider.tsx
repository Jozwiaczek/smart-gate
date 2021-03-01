import React, { ReactNode } from 'react';
import { ThemeProvider } from 'styled-components';

import DefaultLayout from '../theme/DefaultLayout';
import GlobalStyles from '../theme/GlobalStyles';
import DefaultTheme from '../theme/Theme';

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

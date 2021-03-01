import React from 'react';
import { ThemeProvider } from 'styled-components';

import { useThemeType } from '../../hooks';
import GlobalStyles from '../../theme/GlobalStyles';
import { getTheme } from '../../theme/Theme';
import ThemeTypeProvider from '../ThemeTypeProvider';
import { StylesProviderProps } from './StylesProvider.types';

const InnerStylesProvider = ({ children }: StylesProviderProps) => {
  const { themeType } = useThemeType();
  console.log('test');

  return (
    <ThemeProvider theme={getTheme(themeType)}>
      <GlobalStyles />
      {children}
    </ThemeProvider>
  );
};

const StylesProvider = ({ children }: StylesProviderProps) => (
  <ThemeTypeProvider>
    <InnerStylesProvider>{children}</InnerStylesProvider>
  </ThemeTypeProvider>
);

export default StylesProvider;

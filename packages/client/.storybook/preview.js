import styled, { ThemeProvider } from 'styled-components';
import GlobalStyles from '../src/theme/GlobalStyles';
import { getTheme, ThemeType } from '../src/theme/Theme';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  layout: 'centered',
};

export const decorators = [
  (Story) => (
    <ThemeProvider theme={getTheme(ThemeType.dark)}>
      <GlobalStyles />
      <Story />
    </ThemeProvider>
  ),
];

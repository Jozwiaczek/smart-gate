import { ThemeProvider } from 'styled-components';
import theme from '../src/theme/Theme';
import GlobalStyles from '../src/theme/GlobalStyles';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  layout: 'centered',
};

export const decorators = [
  (Story) => (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Story />
    </ThemeProvider>
  ),
];

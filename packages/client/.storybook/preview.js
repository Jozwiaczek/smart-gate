import styled, { ThemeProvider } from 'styled-components';
import theme from '../src/theme/Theme';
import GlobalStyles from '../src/theme/GlobalStyles';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  layout: 'centered',
};

const ViewportContainer = styled.div`
  width: 1440px;
  height: 900px;
`;

export const decorators = [
  (Story) => (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <ViewportContainer>
        <Story />
      </ViewportContainer>
    </ThemeProvider>
  ),
];

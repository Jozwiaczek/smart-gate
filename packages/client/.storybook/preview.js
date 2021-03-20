import styled, { ThemeProvider } from 'styled-components';
import GlobalStyles from '../src/theme/GlobalStyles';
import { getTheme, ThemeType } from '../src/theme/Theme';

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
    <ThemeProvider theme={getTheme(ThemeType.dark)}>
      <GlobalStyles />
      <ViewportContainer>
        <Story />
      </ViewportContainer>
    </ThemeProvider>
  ),
];

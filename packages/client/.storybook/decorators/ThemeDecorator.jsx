import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { getTheme, ThemeType } from '../../src/theme/Theme';
import GlobalStyles from '../../src/theme/GlobalStyles';

const ThemeBlock = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 50vw;
  width: 50vw;
  height: 100vh;
  bottom: 0;
  overflow: auto;
  padding: 10px;
  ${({ side }) =>
    side === 'left'
      ? `
          left: 0;
          right: 50vw;
        `
      : `
          right: 0;
          left: 50vw;
        `}
`;

const ThemeStack = styled.div`
  position: relative;
  min-height: calc(50vh - 15px);
`;

const ThemeDecorator = (StoryFn, { globals: { theme } }) => {
  switch (theme) {
    case 'side-by-side': {
      return (
        <>
          <ThemeProvider theme={getTheme(ThemeType.light)}>
            <GlobalStyles />
            <ThemeBlock side="left" data-side="left">
              <StoryFn />
            </ThemeBlock>
          </ThemeProvider>
          <ThemeProvider theme={getTheme(ThemeType.dark)}>
            <GlobalStyles />
            <ThemeBlock side="right" data-side="right">
              <StoryFn />
            </ThemeBlock>
          </ThemeProvider>
        </>
      );
    }
    case 'stacked': {
      return (
        <>
          <ThemeProvider theme={getTheme(ThemeType.light)}>
            <GlobalStyles />
            <ThemeStack side="left" data-side="left">
              <StoryFn />
            </ThemeStack>
          </ThemeProvider>
          <ThemeProvider theme={getTheme(ThemeType.dark)}>
            <GlobalStyles />
            <ThemeStack side="right" data-side="right">
              <StoryFn />
            </ThemeStack>
          </ThemeProvider>
        </>
      );
    }
    default: {
      return (
        <ThemeProvider theme={getTheme(theme)}>
          <GlobalStyles />
          <StoryFn />
        </ThemeProvider>
      );
    }
  }
};

export default ThemeDecorator;

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
  ${({
    side,
    theme: {
      palette: { text },
    },
  }) =>
    side === 'left'
      ? `
          left: 0;
          right: 50vw;
          background: ${text.light};
        `
      : `
          right: 0;
          left: 50vw;
        `}
`;

const ThemeStack = styled.div`
  position: relative;
  min-height: calc(50vh - 20px);
  ${({
    side,
    theme: {
      palette: { text },
    },
  }) =>
    side === 'top'
      ? `
          background: ${text.light};
        `
      : ''};
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
            <ThemeStack side="top" data-side="top">
              <StoryFn />
            </ThemeStack>
          </ThemeProvider>
          <ThemeProvider theme={getTheme(ThemeType.dark)}>
            <GlobalStyles />
            <ThemeStack side="down" data-side="down">
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

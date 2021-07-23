import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    height: 100%;
    padding: 0;
    margin: 0;
    font-family: Roboto, Rubik, -apple-system, BlinkMacSystemFont, Segoe UI, Oxygen, Ubuntu, Cantarell,
    Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    background: ${({ theme }) => theme.palette.background.default};
    transition: background 200ms ease-in-out;
  }

  main {
    display: flex;
    flex: 1 0 auto;
    height: 100%;
  }

  footer {
    flex-shrink: 0;
  }

  h1, h2, h3, h4, h5, h6, p, b {
    color: ${({ theme }) => theme.palette.text.primary};
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: 700;
    margin-block-start: 0;
    margin-block-end: 0;

  }
  h1, h2, h3 {
    line-height: 120%;
  }

  h4, h5, h6, p {
    line-height: 150%;
  }

  h1 {
    font-size: 60px;
    ${({ theme: { breakpoints, down } }) => `
      ${down(breakpoints.sm)} {
        font-size: 44px;
      }
    `};
  }
  h2 {
    font-size: 40px;
  }
  h3 {
    font-size: 30px;
  }
  h4 {
    font-size: 24px;
  }
  h5 {
    font-size: 20px;
  }
  h6 {
    font-size: 16px;
  }
  p {
    font-size: 16px;
    margin-block-start: 0;
    margin-block-end: 0;
  }
`;

export default GlobalStyles;

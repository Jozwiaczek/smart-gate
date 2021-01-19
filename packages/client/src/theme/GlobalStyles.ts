import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  
  html,
  body {
    height: 100%;
    padding: 0;
    margin: 0;
    font-family: Roboto, Rubik, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell,
    Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    overflow-x: hidden;
  }

  main {
    flex: 1 0 auto;
    height: 100%;
  }

  footer {
    flex-shrink: 0;
  }
`;

export default GlobalStyles;

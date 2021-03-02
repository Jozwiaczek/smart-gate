import styled from 'styled-components';

export const BackgroundLogoWrapper = styled.div(
  ({ theme: { breakpoints, up, palette } }) => `
  display: none;
  ${up(breakpoints.lg)} {
      position: fixed;
      z-index: -999;
      top: -2%;
      right: -15%;
      left: 50%;
      bottom: -2%;
      display: flex;
      justify-content: center;
      align-items: stretch;
      color: ${palette.background.paper};
      opacity: 0.75
  }
  `,
);

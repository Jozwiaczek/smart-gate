import styled, { css } from 'styled-components';

export const Wrapper = styled.div(
  ({ theme: { palette } }) => css`
    height: 100%;
    .svg-container {
      height: 100%;
    }
    .sun-circle {
      fill: ${palette.colors.orange};
    }
    .moon-shadow {
      fill: ${palette.colors.orange};
    }

    .sun-rays {
      stroke: ${palette.colors.orange};
      stroke-width: 8;
      stroke-linecap: round;
    }
  `,
);

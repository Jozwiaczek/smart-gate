import styled, { css } from 'styled-components';

export const ToggleSliderWrapper = styled.div(
  ({ theme: { down, breakpoints } }) => css`
    margin: 80px 0 20px;
    display: inline-block;
    ${down(breakpoints.sm)} {
      display: flex;
      justify-content: center;
    }
  `,
);

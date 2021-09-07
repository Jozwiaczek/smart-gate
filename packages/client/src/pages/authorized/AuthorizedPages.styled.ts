import styled, { css } from 'styled-components';

export const Title = styled.h1(
  ({ theme: { breakpoints, down } }) => css`
    ${down(breakpoints.sm)} {
      text-align: center;
    }
  `,
);

export const Description = styled.p(
  ({ theme: { breakpoints, down, palette } }) => css`
    color: ${palette.text.secondary};
    margin-top: 8px;

    ${down(breakpoints.sm)} {
      margin-top: 32px;
    }

    ${down(breakpoints.sm)} {
      text-align: center;
    }
  `,
);

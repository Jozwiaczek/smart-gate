import styled, { css } from 'styled-components';

export const RowSection = styled.div(
  ({ theme: { breakpoints, down } }) => css`
    display: flex;
    flex-wrap: wrap;
    gap: 100px;
    margin: 80px 0 20px;

    ${down(breakpoints.md)} {
      gap: 0;
      align-items: center;
      flex-direction: column-reverse;
      & > :not(:first-child) {
        margin-bottom: 50px;
      }
    }
  `,
);

import styled, { css } from 'styled-components';

export const FunctionFieldContainer = styled.div(
  ({ theme: { palette } }) => css`
    color: ${palette.text.primary};
    display: flex;
    align-items: center;
  `,
);

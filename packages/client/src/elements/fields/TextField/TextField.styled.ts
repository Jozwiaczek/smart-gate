import styled, { css } from 'styled-components';

export const Label = styled.p(
  ({ theme: { palette } }) => css`
    color: ${palette.text.secondary};
    margin-top: 10px;
  `,
);

export const Wrapper = styled.div`
  ${Label} + p {
    padding-left: 10px;
    margin-bottom: 30px;
  }
`;

import styled, { css } from 'styled-components';

export const IconsWrapper = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 80%;
  gap: 64px;
`;

export const IconWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

export const Icon = styled.div(
  ({ theme: { palette } }) => css`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 42px;
    color: ${palette.primary.main};
  `,
);

export const Label = styled.p(
  ({ theme: { palette } }) => css`
    color: ${palette.text.secondary};
  `,
);

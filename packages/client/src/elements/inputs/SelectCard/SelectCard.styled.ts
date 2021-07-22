import styled, { css } from 'styled-components';

import Card from '../../Card';

export const CardItemButton = styled.button(
  ({ theme: { palette } }) => css`
    align-items: center;
    display: flex;
    justify-content: space-between;
    padding: 24px;
    height: 60px;
    width: 100%;
    background: none;
    border: none;

    :hover {
      cursor: pointer;
      background: ${palette.background.paperHover};
    }
  `,
);

export const StyledCard = styled(Card)(
  ({ theme: { palette } }) => css`
    width: 100%;
    padding: 0;
    overflow: hidden;

    ${CardItemButton}:not(:last-child) {
      border-bottom: 1px solid ${palette.background.default};
    }
  `,
);

export const CheckmarkBox = styled.div(
  ({ theme: { palette } }) => css`
    width: 18px;
    color: ${palette.colors.greenLight};
  `,
);

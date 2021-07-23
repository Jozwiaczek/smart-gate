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
    outline: none;

    :hover {
      cursor: pointer;
      background: ${palette.background.paperHover};
    }

    :focus-visible {
      box-shadow: inset 0 0 0 2px ${palette.primary.light};
    }
  `,
);

export const StyledCard = styled(Card)(
  ({ theme: { palette, sizes } }) => css`
    width: 100%;
    padding: 0;
    overflow: hidden;

    ${CardItemButton}:only-child {
      border-radius: ${sizes.borderRadius};
    }

    ${CardItemButton}:not(:first-child):not(:last-child) {
      border-radius: 0;
    }

    ${CardItemButton}:not(:first-child) {
      border-radius: 0 0 ${sizes.borderRadius} ${sizes.borderRadius};
    }

    ${CardItemButton}:not(:last-child) {
      border-bottom: 1px solid ${palette.background.default};
      border-radius: ${sizes.borderRadius} ${sizes.borderRadius} 0 0;
    }
  `,
);

export const CheckmarkBox = styled.div(
  ({ theme: { palette } }) => css`
    width: 18px;
    color: ${palette.colors.greenLight};
  `,
);

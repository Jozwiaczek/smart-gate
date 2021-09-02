import styled, { css } from 'styled-components';

import Card from '../../Card';

const CARD_ITEM_PADDING = '20px';

export const CardItemButton = styled.button(
  ({ theme: { palette, breakpoints, up } }) => css`
    align-items: center;
    display: flex;
    justify-content: space-between;
    padding: ${CARD_ITEM_PADDING};
    width: 100%;
    background: none;
    border: none;
    outline: none;
    position: relative;

    ${up(breakpoints.sm)} {
      :hover {
        cursor: pointer;
        background: ${palette.background.paperHover};
      }

      :focus-visible {
        box-shadow: inset 0 0 0 2px ${palette.primary.light};
      }
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
      border-radius: ${sizes.borderRadius} ${sizes.borderRadius} 0 0;
      :after {
        content: '';
        position: absolute;
        bottom: 0;
        left: ${CARD_ITEM_PADDING};
        right: ${CARD_ITEM_PADDING};
        height: 1px;
        background: ${palette.background.default};
      }
    }
  `,
);

export const CheckmarkBox = styled.div(
  ({ theme: { palette } }) => css`
    width: 18px;
    color: ${palette.colors.greenLight};
  `,
);

export const ItemContentWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
  width: 100%;
  height: 100%;
  text-align: start;
`;

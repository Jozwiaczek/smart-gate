import styled, { css } from 'styled-components';

import { getCssColor } from '../../../utils';
import { StyledCloseButtonProps } from './CloseButton.types';

export const LeftRight = styled.div`
  transform: rotate(45deg);
`;

export const RightLeft = styled.div`
  transform: rotate(-45deg);
`;

export const StyledButton = styled.button<StyledCloseButtonProps>(
  ({ theme, size, color, hoverColor }) => css`
    align-items: center;
    background: transparent;
    border: none;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    height: ${size};
    outline: none;
    position: relative;
    width: ${size};

    :focus-visible {
      box-shadow: 0 0 0 2px ${theme.palette.primary.main};
      transition: box-shadow 150ms ease-in-out;
    }

    ${LeftRight}, ${RightLeft} {
      border-radius: 2px;
      height: 3px;
      margin-top: 8px;
      position: absolute;
      transition: all 0.3s ease-in;
      width: ${size};
      background: ${getCssColor({ theme, color })};
    }

    &:hover ${LeftRight} {
      background: ${getCssColor({ theme, color: hoverColor })};
      transform: rotate(-45deg);
    }
    &:hover ${RightLeft} {
      background: ${getCssColor({ theme, color: hoverColor })};
      transform: rotate(45deg);
    }
  `,
);

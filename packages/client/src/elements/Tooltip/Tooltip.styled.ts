import styled, { css } from 'styled-components';

import { StyledTooltipBoxProps, TooltipArrowProps } from './Tooltip.types';

export const Wrapper = styled.div`
  display: flex;
`;

export const TargetWrapper = styled.div`
  cursor: help;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TOOLTIP_BOX_HORIZONTAL_PADDING = 10;

const getTooltipArrowPlacement = ({ placement }: TooltipArrowProps) => {
  const margin = '8px';

  const topPlacement = css`
    bottom: -${margin};
    left: calc(50% - ${TOOLTIP_BOX_HORIZONTAL_PADDING}px);
  `;

  switch (placement) {
    case 'top':
      return topPlacement;
    case 'bottom':
      return css`
        top: -${margin};
        left: calc(50% - ${TOOLTIP_BOX_HORIZONTAL_PADDING}px);
      `;
    case 'left':
      return css`
        right: -${margin};
      `;
    case 'right':
      return css`
        left: -${margin};
      `;
    case 'top-start':
      return css`
        left: calc(2 * ${margin});
        bottom: -${margin};
      `;
    case 'top-end':
      return css`
        right: calc(2 * ${margin});
        bottom: -${margin};
      `;
    case 'bottom-start':
      return css`
        left: calc(2 * ${margin});
        top: -${margin};
      `;
    case 'bottom-end':
      return css`
        right: calc(2 * ${margin});
        top: -${margin};
      `;
    default:
      return css`
        display: none;
      `;
  }
};

export const TooltipBoxOuterWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StyledTooltipBox = styled.div<StyledTooltipBoxProps>(
  ({ isShown, theme: { palette } }) => css`
    background: ${palette.background.paper};
    color: ${palette.text.primary};
    font-weight: bold;
    padding: 10px ${TOOLTIP_BOX_HORIZONTAL_PADDING}px;
    font-size: 13px;
    border-radius: 4px;
    max-width: 70%;
    box-shadow: ${palette.boxShadow.default};
    opacity: 1;
    transition: opacity 200ms ease-in-out;
    text-align: center;

    ${!isShown &&
    css`
      opacity: 0;
    `}
  `,
);

export const TooltipArrow = styled.div<TooltipArrowProps>(
  ({ theme: { palette } }) => css`
    ${getTooltipArrowPlacement};
    position: absolute;
    width: 16px;
    height: 16px;
    content: '';
    transform: rotate(45deg);
    background: ${palette.background.paper};
  `,
);

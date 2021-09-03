import styled, { css } from 'styled-components';

import { getCssColor } from '../../utils';
import { ContentProps, SwipeoutActionButtonProps, WrapperProps } from './Swipeout.types';

export const Wrapper = styled.div<WrapperProps>(
  ({ isDragging }) => css`
    display: flex;
    justify-content: space-between;
    width: 100%;
    .react-draggable {
      ${!isDragging &&
      css`
        transition: transform 350ms cubic-bezier(0.33, 1, 0.68, 1);
      `}
    }
  `,
);

export const Content = styled.div<ContentProps>(
  ({ isDragging }) => css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    :hover {
      ${isDragging
        ? css`
            cursor: grabbing;
          `
        : css`
            cursor: grab;
          `}
    }
  `,
);

export const ActionsContainer = styled.div`
  height: 100%;
  display: flex;
`;

export const ActionButton = styled.button<SwipeoutActionButtonProps>(
  ({ theme, borderRadius, background, color }) => css`
    height: 100%;
    min-width: 100px;
    border: none;
    background: ${getCssColor({ color: background ?? 'background-default', theme })};
    color: ${getCssColor({ color: color ?? 'text-primary', theme })};
    border-radius: ${borderRadius ?? 0};

    :hover {
      cursor: pointer;
    }

    :disabled {
      cursor: not-allowed;
    }
  `,
);

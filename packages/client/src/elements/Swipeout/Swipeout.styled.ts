import styled, { css } from 'styled-components';

import { getCssColor } from '../../utils';
import { DEFAULT_ACTION_BUTTON_WIDTH } from './Swipeout.constants';
import {
  ActionsContainerProps,
  ContentProps,
  SwipeoutActionButtonProps,
  WrapperProps,
} from './Swipeout.types';

export const Wrapper = styled.div<WrapperProps>(
  ({ isDragging, height }) => css`
    width: 100%;
    height: ${height}px;
    .react-draggable {
      ${!isDragging &&
      css`
        transition: transform 350ms cubic-bezier(0.33, 1, 0.68, 1);
      `}
    }
  `,
);
export const ComponentWrapper = styled.div`
  position: absolute;
`;

export const Content = styled.div<ContentProps>(
  ({ isDragging }) => css`
    position: relative;
    width: 100%;

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

export const ActionsContainer = styled.div<ActionsContainerProps>(
  ({ width, height }) => css`
    height: ${height}px;
    position: absolute;
    right: -${width + 1}px;
    width: ${width}px;
    display: flex;
  `,
);

export const ActionButton = styled.button<SwipeoutActionButtonProps>(
  ({ theme, borderRadius, background, color, width = DEFAULT_ACTION_BUTTON_WIDTH }) => css`
    height: 100%;
    width: ${width}px;
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
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

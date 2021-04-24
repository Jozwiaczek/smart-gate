import styled from 'styled-components';

import { ScrollButtonWrapperProps, TabsIndicatorProps, TabsWrapperProps } from './Tabs.types';

export const TabsRoot = styled.div`
  height: 100%;
  position: relative;
`;

export const TabsWrapper = styled.div<TabsWrapperProps>`
  -ms-overflow-style: none;
  -webkit-overflow-scrolling: touch;
  display: flex;
  height: 100%;
  position: relative;
  scrollbar-width: none;
  width: 100%;
  ::-webkit-scrollbar {
    display: none;
  }
  ${({ orientation }) => orientation === 'vertical' && 'flex-direction: column'};
  ${({ orientation }) => `
      overflow-x: ${orientation === 'vertical' ? 'hidden' : 'auto'};
      overflow-y: ${orientation === 'vertical' ? 'auto' : 'hidden'};
  `};

  ${({ variant }) => {
    if (variant === 'fullWidth') {
      return 'justify-content: space-evenly;';
    }
  }}
`;

export const TabsIndicator = styled.span<TabsIndicatorProps>`
  background: ${({ theme }) => theme.palette.primary.light};
  border-radius: ${({ theme }) => theme.sizes.borderRadius};
  ${({ position }) => `${position}: 0`};
  height: ${({ height }) => height}px;
  position: absolute;
  width: ${({ width }) => width}px;

  ${({ orientation, animationSpace }) =>
    orientation === 'vertical'
      ? `
    transition: top 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    top: ${animationSpace}px;
  `
      : `
    transition: left 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    left: ${animationSpace}px;
  `}
`;

export const ScrollButtonWrapper = styled.div<ScrollButtonWrapperProps>`
  align-items: center;
  bottom: ${({ displayType }) => (displayType === 'end' ? 0 : 'auto')};
  display: flex;
  height: ${({ orientation }) => (orientation === 'horizontal' ? '100%' : '50px')};
  justify-content: center;
  left: ${({ displayType }) => (displayType === 'start' ? 0 : 'auto')};
  pointer-events: none;
  position: absolute;
  right: ${({ displayType }) => (displayType === 'end' ? 0 : 'auto')};
  top: ${({ displayType }) => (displayType === 'start' ? 0 : 'auto')};
  width: ${({ orientation }) => (orientation === 'vertical' ? '100%' : '50px')};
  z-index: 1;
`;

export const ScrollIconWrapper = styled.div<ScrollButtonWrapperProps>`
  height: 50px;
  pointer-events: all;
  transform: rotate(
    ${({ displayType, orientation }) => {
      if (displayType === 'start') {
        return orientation === 'vertical' ? '-90deg' : '180deg';
      }
      return orientation === 'vertical' ? '90deg' : '0deg';
    }}
  );
  width: 50px;
`;

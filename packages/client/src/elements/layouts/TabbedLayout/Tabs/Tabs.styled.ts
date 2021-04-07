import styled from 'styled-components';

import { TabsIndicatorProps, TabsWrapperProps } from './Tabs.types';

export const TabsWrapper = styled.div<TabsWrapperProps>`
  position: relative;
  display: flex;
  height: 100%;
  width: 100%;
  -webkit-overflow-scrolling: touch;
  "scrollbar-width": "none;";
  -ms-overflow-style: none;
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
  position: absolute;
  background: ${({ theme }) => theme.palette.primary.light};
  ${({ position }) => `${position}: 0`};
  height: ${({ height }) => height}px;
  width: ${({ width }) => width}px;
  border-radius: ${({ theme }) => theme.sizes.borderRadius};

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

import styled from 'styled-components';

import { TabsIndicatorProps, TabsWrapperProps } from './Tabs.types';

export const TabsWrapper = styled.div<TabsWrapperProps>`
  position: relative;
  overflow-x: auto;
  display: flex;
  height: 100%;
  width: 100%;

  ${({ orientation }) => orientation === 'vertical' && 'flex-direction: column'};

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
  left: ${({ left }) => `${left}px`};
  height: ${({ height }) => height}px;
  width: ${({ width }) => width}px;
  transition: left 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  border-radius: ${({ theme }) => theme.sizes.borderRadius};
`;

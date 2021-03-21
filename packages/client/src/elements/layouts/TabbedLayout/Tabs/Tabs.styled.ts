import styled from 'styled-components';

import { TabMarkerPosition, TabsIndicatorProps, TabsWrapperProps } from './Tabs.types';

export const TabsWrapper = styled.div<TabsWrapperProps>`
  position: relative;
  overflow-x: auto;
  display: flex;
  height: 100%;
  width: 100%;

  ${({ variant }) => {
    if (variant === 'fullWidth') {
      return 'justify-content: space-evenly;';
    }
  }}
`;

const getTabsIndicatorPosition = ({ position }: { position: TabMarkerPosition }) => {
  if (position === 'bottom') {
    return 'bottom: 0';
  }
  if (position === 'top') {
    return 'top: 0';
  }
};

export const TabsIndicator = styled.span<TabsIndicatorProps>`
  position: absolute;
  bottom: 0;
  ${getTabsIndicatorPosition};
  background: ${({ theme }) => theme.palette.primary.light};
  left: ${({ left }) => `${left}px`};
  height: 5px;
  width: ${({ width }) => width}px;
  transition: left 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  border-radius: ${({ theme }) => theme.sizes.borderRadius};
`;

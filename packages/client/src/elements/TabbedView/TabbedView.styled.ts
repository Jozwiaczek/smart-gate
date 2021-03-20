import styled from 'styled-components';

import { TabMarkerPosition, TabsIndicatorProps } from './TabbedView.types';

export const TabsWrapper = styled.div`
  position: relative;
  display: flex;
  height: 100%;
  width: 100%;
  justify-content: space-evenly;
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
  border-radius: 12px;
`;

export const TabLabel = styled.p<{ isActive: boolean }>`
  font-size: 14px;
  color: ${({ theme, isActive }) =>
    isActive ? theme.palette.text.primary : theme.palette.text.secondary};
  transition: color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
`;

export const TabButton = styled.button<{ width: number; isActive: boolean }>`
  width: ${({ width }) => width}px;
  height: 100%;
  display: flex;
  background: transparent;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: none;
  outline: none;
  cursor: pointer;
  color: ${({ theme, isActive }) =>
    isActive ? theme.palette.primary.light : theme.palette.text.secondary};
  transition: color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  svg {
    margin-bottom: 4px;
  }

  :hover {
    ${TabLabel} {
      color: ${({ theme }) => theme.palette.text.primary};
    }
  }
`;

export const TabPanelWrapper = styled.div`
  padding: 30px;
`;

import styled from 'styled-components';

import { TabButtonProps, TabLabelProps } from './Tab.types';

export const TabLabel = styled.p<TabLabelProps>`
  font-size: 14px;
  color: ${({ theme, isActive }) =>
    isActive ? theme.palette.text.primary : theme.palette.text.secondary};
  transition: color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
`;

export const TabButton = styled.button<TabButtonProps>`
  position: relative;
  overflow: hidden;
  width: ${({ width, variant }) => (variant === 'fullWidth' ? '100%' : `${width}px`)};
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

  :focus-visible {
    box-shadow: inset 0 0 0 2px ${({ theme }) => theme.palette.primary.light};
    border-radius: ${({ theme }) => theme.sizes.borderRadius};
  }
`;

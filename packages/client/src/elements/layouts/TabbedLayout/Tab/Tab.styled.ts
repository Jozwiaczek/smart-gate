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
  min-width: ${({ variant, width }) => (variant === 'fullWidth' ? 0 : width)};
  width: ${({ width }) => width};
  height: ${({ height }) => height};
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

  ${({ variant }) =>
    variant === 'scrollable' &&
    `
    position: relative;
    flex: 1 1 auto;
    white-space: nowrap;
  `};

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

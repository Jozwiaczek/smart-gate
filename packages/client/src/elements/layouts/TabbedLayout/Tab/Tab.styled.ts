import styled from 'styled-components';

import { TabButtonProps, TabLabelProps } from './Tab.types';

export const TabLabel = styled.p<TabLabelProps>`
  color: ${({ theme, isActive }) =>
    isActive ? theme.palette.text.primary : theme.palette.text.secondary};
  font-size: 14px;
  transition: color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
`;

export const TabButton = styled.button<TabButtonProps>`
  align-items: center;
  background: transparent;
  border: none;
  color: ${({ theme, isActive }) =>
    isActive ? theme.palette.primary.light : theme.palette.text.secondary};
  cursor: pointer;
  display: flex;
  flex-direction: column;
  height: ${({ height }) => height};
  justify-content: center;
  min-height: ${({ variant, height }) => (variant === 'fullWidth' ? 0 : height)};
  min-width: ${({ variant, width }) => (variant === 'fullWidth' ? 0 : width)};
  outline: none;
  overflow: hidden;
  position: relative;
  transition: color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  width: ${({ width }) => width};
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
    border-radius: ${({ theme }) => theme.sizes.borderRadius};
    box-shadow: inset 0 0 0 2px ${({ theme }) => theme.palette.primary.light};
  }
`;

import styled from 'styled-components';

import { IconButton } from '../../buttons';
import { SelectOpenDirection } from './Select.types';

export const SelectWrapper = styled.div`
  display: flex;
  position: relative;
`;

export const SelectInput = styled(IconButton)`
  align-items: center;
  border-radius: ${({ theme }) => theme.sizes.borderRadius};
  color: ${({ theme }) => theme.palette.text.primary};
  display: flex;
  height: 16px;
  width: 100%;
  svg {
    margin-top: 3px;
  }
`;

export const SelectList = styled.div<{ isOpen: boolean; openDirection: SelectOpenDirection }>`
  background: ${({ theme }) => theme.palette.background.paper};
  border-radius: ${({ theme }) => theme.sizes.borderRadius};
  box-shadow: ${({ theme }) => theme.palette.boxShadow.getBoxShadow(0.15)};
  max-height: 317px;
  min-width: 50px;
  overflow: hidden;
  position: absolute;
  top: ${({ openDirection }) => (openDirection === 'down' ? '-15px' : '-180px')};
  transform-origin: ${({ openDirection }) => (openDirection === 'down' ? 'top' : 'bottom')};
  transition: transform 150ms ease-in-out;
  ${({ isOpen }) =>
    isOpen
      ? `
      transform: scaleY(1);
    `
      : `
      transform: scaleY(0);
    `}
`;

export const SelectListItem = styled.button`
  align-items: center;
  background: ${({ theme }) => theme.palette.background.paper};
  border: none;
  color: ${({ theme }) => theme.palette.text.primary};
  cursor: pointer;
  display: flex;
  font-size: 16px;
  justify-content: center;
  line-height: 16px;
  min-height: 50px;
  outline: none;
  transition: box-shadow 150ms ease-in-out;
  width: 100%;

  :hover {
    background: ${({ theme }) => theme.palette.background.paperHover};
  }

  :focus-visible {
    box-shadow: 0 0 0 3px ${({ theme }) => theme.palette.primary.main} inset;
  }
`;

export const CurrentlySelectedLabel = styled.p`
  margin-right: 0.5em;
`;

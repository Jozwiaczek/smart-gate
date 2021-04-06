import styled from 'styled-components';

import { IconButton } from '../../buttons';

export const SelectWrapper = styled.div`
  display: flex;
  position: relative;
`;

export const SelectInput = styled(IconButton)`
  width: 100%;
  color: ${({ theme }) => theme.palette.text.primary};
  height: 16px;
  border-radius: ${({ theme }) => theme.sizes.borderRadius};
  display: flex;
  align-items: center;
  svg {
    margin-top: 3px;
  }
`;

export const SelectList = styled.div<{ isOpen: boolean }>`
  position: absolute;
  top: -15px;
  max-height: 317px;
  min-width: 50px;
  background: ${({ theme }) => theme.palette.background.paper};
  box-shadow: ${({ theme }) => theme.palette.boxShadow.getBoxShadow(0.15)};
  border-radius: ${({ theme }) => theme.sizes.borderRadius};
  overflow: hidden;
  transition: transform 150ms ease-in-out;
  transform-origin: top;
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
  font-size: 16px;
  cursor: pointer;
  min-height: 50px;
  width: 100%;
  line-height: 16px;
  outline: none;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.palette.text.primary};
  background: ${({ theme }) => theme.palette.background.paper};
  transition: box-shadow 150ms ease-in-out;

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

import styled, { css } from 'styled-components';

import { IconButton } from '../../buttons';
import Card from '../../Card';

export const StyledCard = styled(Card)<{ isBulkActionsOpen: boolean }>`
  border-radius: ${({
    isBulkActionsOpen,
    theme: {
      sizes: { borderRadius },
    },
  }) => (isBulkActionsOpen ? `0 0 ${borderRadius} ${borderRadius}` : borderRadius)};
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
  overflow-y: auto;
  padding: 0;
  transition: border-radius 150ms;

  width: 100%;

  th {
    background: ${({ theme }) => theme.palette.background.paper};
    z-index: 999;
  }

  thead th {
    position: sticky;
    top: 0;
  }

  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.palette.text.greyDark};
    border-radius: 0 12px 12px 0;
  }

  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.palette.text.greyLight};
    border-radius: 0 12px 12px 0;
    cursor: pointer;
  }
`;

export const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
`;

export const TableHeader = styled.th`
  color: ${({ theme }) => theme.palette.text.primary};
  font-weight: 700;
  text-align: left;
`;

export const TableHeaderCheckbox = styled.th`
  align-self: start;
  padding: 0 12px 0 16px;
  width: 24px;
`;

export const TableRow = styled.tr`
  border-bottom: 1px solid ${({ theme }) => theme.palette.divider.paper};
  height: 60px;
`;

export const TableHead = styled.thead``;

export const TableCell = styled.td`
  color: ${({ theme }) => theme.palette.text.primary};
`;

export const TableCellCheckbox = styled.td`
  padding: 0 12px 0 16px;
  width: 24px;
`;

export const TableBody = styled.tbody`
  tr {
    :hover,
    :active {
      background: ${({ theme }) => theme.palette.background.paperHover};
      transition: background 100ms ease-in-out;
    }
  }
`;

export const ListWrapper = styled.div`
  height: 100%;
  position: relative;
  width: 100%;
`;

export const BulkActionsWrapper = styled.div<{ isOpen: boolean }>`
  align-items: center;
  background: ${({ theme }) => theme.palette.primary.main};
  border-radius: ${({
    theme: {
      sizes: { borderRadius },
    },
  }) =>
    css`
      ${borderRadius} ${borderRadius} 0 0
    `};
  box-shadow: ${({ theme }) => theme.palette.boxShadow.getBoxShadow(1)};
  display: flex;
  height: 50px;
  justify-content: space-between;
  left: 0;
  padding: 0 7px;
  position: absolute;
  right: 0;
  top: -50px;

  transform-origin: bottom;
  transition: transform 150ms;

  ${({ isOpen }) =>
    isOpen
      ? `
      transform: scaleY(1);
    `
      : `
      transform: scaleY(0);
    `}
`;

export const BulkCancelButtonWrapper = styled.div`
  margin: 0 10px;
`;

export const BulkCancelWrapper = styled.div`
  align-items: center;
  color: ${({ theme }) => theme.palette.text.primary};
  display: flex;
  height: 100%;
`;

export const DeleteButton = styled(IconButton)`
  border-radius: ${({ theme }) => theme.sizes.borderRadius};
  height: 36px;
  svg {
    margin-right: 10px;
  }
`;

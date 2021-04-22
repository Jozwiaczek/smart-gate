import styled from 'styled-components';

import { IconButton } from '../../buttons';
import Card from '../../Card';

export const StyledCard = styled(Card)<{ isBulkActionsOpen: boolean }>`
  padding: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: border-radius 150ms;
  border-radius: ${({
    isBulkActionsOpen,
    theme: {
      sizes: { borderRadius },
    },
  }) => (isBulkActionsOpen ? `0 0 ${borderRadius} ${borderRadius}` : borderRadius)};

  overflow-y: auto;

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
  width: 100%;
  border-collapse: collapse;
`;

export const TableHeader = styled.th`
  font-weight: 700;
  color: ${({ theme }) => theme.palette.text.primary};
  text-align: left;
`;

export const TableHeaderCheckbox = styled.th`
  width: 24px;
  padding: 0 12px 0 16px;
  align-self: start;
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
  width: 24px;
  padding: 0 12px 0 16px;
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
  position: relative;
  height: 100%;
  width: 100%;
`;

export const BulkActionsWrapper = styled.div<{ isOpen: boolean }>`
  position: absolute;
  display: flex;
  justify-content: space-between;
  padding: 0 7px;
  align-items: center;
  background: ${({ theme }) => theme.palette.primary.main};
  box-shadow: ${({ theme }) => theme.palette.boxShadow.getBoxShadow(1)};
  height: 50px;
  top: -50px;
  left: 0;
  right: 0;
  transition: transform 150ms;

  transform-origin: bottom;
  border-radius: ${({
    theme: {
      sizes: { borderRadius },
    },
  }) => `${borderRadius} ${borderRadius} 0 0`};

  ${({ isOpen }) =>
    isOpen
      ? `
      transform: scaleY(1);
    `
      : `
      transform: scaleY(0);
    `}
`;

export const BulkCancelButton = styled(IconButton)`
  margin-right: 9px;
  color: ${({ theme }) => theme.palette.text.dark};
  svg {
    width: 14px;
  }
`;

export const BulkCancelWrapper = styled.div`
  color: ${({ theme }) => theme.palette.text.primary};
  display: flex;
  align-items: center;
  height: 100%;
`;

export const DeleteButton = styled(IconButton)`
  height: 36px;
  border-radius: ${({ theme }) => theme.sizes.borderRadius};
  svg {
    margin-right: 10px;
  }
`;

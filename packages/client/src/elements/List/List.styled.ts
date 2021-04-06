import styled from 'styled-components';

import { IconButton } from '../buttons';
import Card from '../Card';

export const StyledCard = styled(Card)<{ isBulkActionsOpen: boolean }>`
  padding: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  transition: border-radius 200ms ease-in-out;
  border-radius: ${({
    isBulkActionsOpen,
    theme: {
      sizes: { borderRadius },
    },
  }) => (isBulkActionsOpen ? `0 0 ${borderRadius} ${borderRadius}` : borderRadius)};
`;

export const Table = styled.table`
  width: 100%;
  display: table;
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

export const BulkActionsWrapper = styled.div<{ isOpen: boolean }>`
  position: absolute;
  display: flex;
  justify-content: space-between;
  padding: 0 7px;
  align-items: center;
  background: ${({ theme }) => theme.palette.primary.main};
  height: 50px;
  top: -50px;
  left: 0;
  right: 0;
  transition: transform 200ms ease-in-out;

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

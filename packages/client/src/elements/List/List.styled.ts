import styled from 'styled-components';

import Card from '../Card';

export const StyledCard = styled(Card)`
  padding: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const Table = styled.table`
  width: 100%;
  display: table;
  border-collapse: collapse;
`;

export const TableHeadRow = styled.thead``;

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

export const PaginationWrapper = styled.div`
  border-top: 1px solid ${({ theme }) => theme.palette.divider.paper};
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 60px;
`;

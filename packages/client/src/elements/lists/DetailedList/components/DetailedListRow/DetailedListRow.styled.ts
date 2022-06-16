import styled from 'styled-components';

export const TableRow = styled.tr`
  border-bottom: 1px solid ${({ theme }) => theme.palette.divider.paper};
  height: 60px;
`;

export const TableCell = styled.td`
  color: ${({ theme }) => theme.palette.text.primary};
`;

export const TableCellCheckbox = styled.td`
  padding: 0 12px 0 16px;
  width: 24px;
`;

import React, { useCallback, useLayoutEffect, useRef, useState } from 'react';

import { getLabelFromSource } from '../../utils';
import { Checkbox } from '../inputs';
import {
  PaginationWrapper,
  StyledCard,
  Table,
  TableBody,
  TableCell,
  TableCellCheckbox,
  TableHeader,
  TableHeaderCheckbox,
  TableHeadRow,
  TableRow,
} from './List.styled';
import { ListCellValue, ListId, ListProps } from './List.types';

const List = <T extends Record<string, ListCellValue>>({
  headers,
  data,
  onRowClick,
  total,
  pagination: { page = 1 },
}: ListProps<T>) => {
  const [selectedRows, setSelectedRows] = useState<Array<ListId>>([]);
  const areAllRowsSelected = Boolean(selectedRows.length === data.length);
  const containerRef = useRef<HTMLTableElement>(null);
  const headerRowRef = useRef<HTMLTableRowElement>(null);
  const [perPage, setPerPage] = useState(0);

  useLayoutEffect(() => {
    if (containerRef.current && headerRowRef.current) {
      const tableHeight = containerRef.current.offsetHeight;
      const rowHeight = headerRowRef.current.offsetHeight;
      const rowsPerPage = Math.floor((tableHeight - 2 * rowHeight) / rowHeight);
      setPerPage(rowsPerPage);
    }
  }, []);

  const totalPages = Math.round(total / perPage);

  const checkIsRowSelected = useCallback((id: ListId): boolean => selectedRows.includes(id), [
    selectedRows,
  ]);

  const onMarkAllRows = useCallback(() => {
    if (areAllRowsSelected) {
      setSelectedRows([]);
      return;
    }

    setSelectedRows(data.map(({ id }) => id));
  }, [areAllRowsSelected, data]);

  const onMarkRow = useCallback(
    (id: ListId) => {
      if (checkIsRowSelected(id)) {
        setSelectedRows((prev) => prev.filter((selectedRowId) => selectedRowId !== id));
        return;
      }

      setSelectedRows((prev) => [...prev, id]);
    },
    [checkIsRowSelected],
  );

  return (
    <StyledCard ref={containerRef}>
      <Table>
        <TableHeadRow>
          <TableRow ref={headerRowRef}>
            <TableHeaderCheckbox>
              <Checkbox onChange={onMarkAllRows} checked={areAllRowsSelected} />
            </TableHeaderCheckbox>
            {headers.map(({ label }) => (
              <TableHeader key={label}>{getLabelFromSource(label)}</TableHeader>
            ))}
          </TableRow>
        </TableHeadRow>
        <TableBody>
          {data.slice((page - 1) * perPage, perPage + 1).map(({ id, row }) => {
            const cells = Object.values(row);
            return (
              <TableRow key={id}>
                <TableCellCheckbox>
                  <Checkbox onChange={() => onMarkRow(id)} checked={checkIsRowSelected(id)} />
                </TableCellCheckbox>
                {cells.map((cell, index) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <TableCell onClick={onRowClick} key={index}>
                    {cell}
                  </TableCell>
                ))}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      {totalPages > 0 && (
        <PaginationWrapper>
          <p>1-25 of 900</p>
          <p>1 2 3 ... 36</p>
        </PaginationWrapper>
      )}
    </StyledCard>
  );
};

List.displayName = 'List';

export default List;

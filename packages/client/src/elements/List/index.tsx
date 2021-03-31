import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';

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
import { BaseListData, ListProps } from './List.types';

const List = <T extends BaseListData>({
  headers,
  data,
  onRowClick,
  total,
  pagination: { page = 1 },
}: ListProps<T>) => {
  const [selectedRows, setSelectedRows] = useState<Array<string>>([]);
  const areAllRowsSelected = Boolean(selectedRows.length === data.length);
  const containerRef = useRef<HTMLTableElement>(null);
  const headerRowRef = useRef<HTMLTableRowElement>(null);
  const [perPage, setPerPage] = useState(3);
  const headersKeys = headers.map(({ key }) => key);

  useEffect(() => {
    if (containerRef.current && headerRowRef.current) {
      const tableHeight = containerRef.current.offsetHeight;
      const rowHeight = headerRowRef.current.offsetHeight;
      const rowsPerPage = Math.floor((tableHeight - 2 * rowHeight) / rowHeight);
      setPerPage(rowsPerPage);
    }
  }, []);

  const totalPages = useMemo(() => Math.round(total / perPage), [perPage, total]);

  const checkIsRowSelected = useCallback((id: string): boolean => selectedRows.includes(id), [
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
    (id: string) => {
      if (checkIsRowSelected(id)) {
        setSelectedRows((prev) => prev.filter((selectedRowId) => selectedRowId !== id));
        return;
      }

      setSelectedRows((prev) => [...prev, id]);
    },
    [checkIsRowSelected],
  );

  const formattedRows = useMemo(() => {
    const slicedByPage = data.slice((page - 1) * perPage, perPage + 1);
    return slicedByPage.map((row) => {
      const cells = Object.entries(row);
      const sorted = cells.sort(
        ([aKey], [bKey]) => headersKeys.indexOf(aKey) - headersKeys.indexOf(bKey),
      );
      return Object.fromEntries(sorted);
    });
  }, [data, page, perPage, headersKeys]);

  return (
    <StyledCard ref={containerRef}>
      <Table>
        <TableHeadRow>
          <TableRow ref={headerRowRef}>
            <TableHeaderCheckbox>
              <Checkbox onChange={onMarkAllRows} checked={areAllRowsSelected} />
            </TableHeaderCheckbox>
            {headers.map(({ label, key }) => (
              <TableHeader key={key}>{label || getLabelFromSource(key)}</TableHeader>
            ))}
          </TableRow>
        </TableHeadRow>
        <TableBody>
          {formattedRows.map((row) => (
            <TableRow key={row.id}>
              <TableCellCheckbox>
                <Checkbox onChange={() => onMarkRow(row.id)} checked={checkIsRowSelected(row.id)} />
              </TableCellCheckbox>
              {Object.entries(row).map(([cellKey, cellValue]) => {
                if (!headersKeys.includes(cellKey)) {
                  return null;
                }

                return (
                  <TableCell onClick={onRowClick} key={`${row.id}-${cellKey}`}>
                    {cellValue}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
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

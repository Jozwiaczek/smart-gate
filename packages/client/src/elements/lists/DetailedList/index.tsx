import React, {
  Children,
  cloneElement,
  isValidElement,
  useCallback,
  useMemo,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { useMutation, useQuery } from 'react-query';

import { CancelIcon, TrashIcon } from '../../../icons';
import { ApiList } from '../../../interfaces/api.types';
import { BaseFieldProps, BaseRecordField } from '../../fields/Fields.types';
import { Checkbox } from '../../inputs';
import {
  BulkActionsWrapper,
  BulkCancelButton,
  BulkCancelWrapper,
  DeleteButton,
  StyledCard,
  Table,
  TableBody,
  TableCell,
  TableCellCheckbox,
  TableHead,
  TableHeader,
  TableHeaderCheckbox,
  TableRow,
} from './DetailedList.styled';
import { DetailedListProps, PerPage } from './DetailedList.types';
import Pagination from './Pagination';

const DetailedList = ({ onRowClick, children, resource }: DetailedListProps) => {
  const removeUser = async (id: string) => {
    console.log('Removed:', id);
  };
  const deleteMutation = useMutation(removeUser);
  const { data: queryResult } = useQuery<ApiList<BaseRecordField>>(`/${resource}`);
  const [selectedRows, setSelectedRows] = useState<Array<string>>([]);
  const [perPage, setPerPage] = useState<PerPage>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { t } = useTranslation();

  const totalRecords = useMemo((): number => {
    if (queryResult) {
      return queryResult.total;
    }
    return 0;
  }, [queryResult]);

  const headers = useMemo((): Array<BaseFieldProps<BaseRecordField>> => {
    const headersFromChildren = Children.map(children, (child) => {
      if (isValidElement(child)) {
        return child.props;
      }
    });
    return headersFromChildren ?? [];
  }, [children]);

  const areAllRowsSelected = useMemo((): boolean => Boolean(selectedRows.length === totalRecords), [
    selectedRows.length,
    totalRecords,
  ]);

  const checkIsRowSelected = useCallback((id: string): boolean => selectedRows.includes(id), [
    selectedRows,
  ]);

  const unselectAllRows = () => {
    setSelectedRows([]);
  };

  const onMarkAllRows = useCallback((): void => {
    if (areAllRowsSelected) {
      unselectAllRows();
      return;
    }

    if (queryResult) {
      const { data } = queryResult;
      setSelectedRows(data.map(({ id }) => id));
    }
  }, [areAllRowsSelected, queryResult]);

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

  const slicedRecords = useMemo((): Array<BaseRecordField> => {
    if (queryResult) {
      const { data } = queryResult;
      const sliceFrom = perPage * currentPage - perPage;
      const sliceTo = perPage * currentPage;
      return data.slice(sliceFrom, sliceTo);
    }
    return [];
  }, [queryResult, currentPage, perPage]);

  const isBulkActionsOpen = Boolean(selectedRows.length);

  const removeSelectedItems = useCallback(() => {
    selectedRows.forEach((id) => {
      deleteMutation.mutate(id);
    });
    setSelectedRows([]);
  }, [deleteMutation, selectedRows]);

  return (
    <StyledCard isBulkActionsOpen={isBulkActionsOpen}>
      <BulkActionsWrapper isOpen={isBulkActionsOpen}>
        <BulkCancelWrapper>
          <BulkCancelButton onClick={unselectAllRows}>
            <CancelIcon />
          </BulkCancelButton>
          {selectedRows.length}&nbsp;
          {selectedRows.length > 1 ? t('lists.detailedList.items') : t('lists.detailedList.item')}
        </BulkCancelWrapper>
        <DeleteButton color="red" onClick={removeSelectedItems}>
          <TrashIcon />
          {t('actions.delete')}
        </DeleteButton>
      </BulkActionsWrapper>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeaderCheckbox>
              <Checkbox onChange={onMarkAllRows} checked={areAllRowsSelected} />
            </TableHeaderCheckbox>
            {headers.map(({ label, source }) => (
              <TableHeader key={label || source}>
                {label || t(`baseApiFields.${source}` as never)}
              </TableHeader>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {slicedRecords.map((record) => (
            <TableRow key={record.id}>
              <TableCellCheckbox>
                <Checkbox
                  onChange={() => onMarkRow(record.id)}
                  checked={checkIsRowSelected(record.id)}
                />
              </TableCellCheckbox>
              {Children.map(children, (child) => {
                if (!isValidElement(child)) {
                  return null;
                }

                const { source } = child.props;

                return (
                  <TableCell onClick={onRowClick} key={`${record.id}-${source}`}>
                    {cloneElement(child, { record })}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Pagination
        perPage={perPage}
        setPerPage={setPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalRecords={totalRecords}
      />
    </StyledCard>
  );
};

DetailedList.displayName = 'DetailedList';

export default DetailedList;

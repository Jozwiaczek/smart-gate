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
import { CSSProperties, useTheme } from 'styled-components';

import { useAxios, useSnackbar } from '../../../hooks';
import { ApiListResponse } from '../../../interfaces/api.types';
import { getLabelFromSource, onlyOnDevEnv } from '../../../utils';
import { CloseButton, DeleteHoverButton } from '../../buttons';
import { BaseFieldProps, BaseRecordField } from '../../fields/Fields.types';
import { Checkbox } from '../../inputs';
import {
  BulkActionsWrapper,
  BulkCancelButtonWrapper,
  BulkCancelWrapper,
  ListWrapper,
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
import NoData from './NoData';
import Pagination from './Pagination';

const DetailedList = ({
  onRowClick,
  children,
  resource,
  rowStyle,
  rowCellsStyle,
  noDataLabel,
}: DetailedListProps) => {
  const theme = useTheme();
  const axios = useAxios();
  const { data: queryResult, refetch } = useQuery<ApiListResponse<BaseRecordField>>(`/${resource}`);
  const [selectedRows, setSelectedRows] = useState<Array<string>>([]);
  const [perPage, setPerPage] = useState<PerPage>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const snackbar = useSnackbar();
  const { t } = useTranslation();

  const removeMany = async (ids: Array<string>) => {
    try {
      await axios.post(`/${resource}/removeMany`, { ids });
      await refetch();
    } catch (error) {
      onlyOnDevEnv(() => console.error(error));
      snackbar({ message: t('lists.general.removeError'), severity: 'error' });
    }
  };
  const removeManyMutation = useMutation(removeMany);

  const totalRecords = useMemo((): number => {
    if (queryResult) {
      return queryResult.total;
    }
    return 0;
  }, [queryResult]);

  const headers = useMemo((): Array<BaseFieldProps<BaseRecordField>> => {
    const headersFromChildren = Children.map(children, (child) => {
      if (isValidElement(child)) {
        return child.props as BaseFieldProps<BaseRecordField>;
      }
    });
    return headersFromChildren ?? [];
  }, [children]);

  const areAllRowsSelected = useMemo(
    (): boolean => Boolean(selectedRows.length === totalRecords),
    [selectedRows.length, totalRecords],
  );

  const checkIsRowSelected = useCallback(
    (id: string): boolean => selectedRows.includes(id),
    [selectedRows],
  );

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
    removeManyMutation.mutate(selectedRows);
    setSelectedRows([]);
  }, [removeManyMutation, selectedRows]);

  const getHeaderLabel = (source: string, label?: string, noTranslation?: boolean) => {
    if (noTranslation) {
      return label || getLabelFromSource(source);
    }

    return t(label as never) || t(`baseApiFields.${source}` as never);
  };

  if (!totalRecords) {
    return <NoData label={noDataLabel} />;
  }

  return (
    <ListWrapper>
      <StyledCard isBulkActionsOpen={isBulkActionsOpen}>
        <BulkActionsWrapper isOpen={isBulkActionsOpen}>
          <BulkCancelWrapper>
            <BulkCancelButtonWrapper>
              <CloseButton
                color="text-dark"
                hoverColor="text-light"
                size="18px"
                onClick={unselectAllRows}
              />
            </BulkCancelButtonWrapper>
            {selectedRows.length}&nbsp;
            {selectedRows.length > 1 ? t('lists.detailedList.items') : t('lists.detailedList.item')}
          </BulkCancelWrapper>
          <DeleteHoverButton onClick={removeSelectedItems} />
        </BulkActionsWrapper>
        <Table data-testid={`table-${resource}`}>
          <TableHead>
            <TableRow>
              <TableHeaderCheckbox>
                <Checkbox onChange={onMarkAllRows} checked={areAllRowsSelected} />
              </TableHeaderCheckbox>
              {headers.map(({ label, source, noTranslation }) => (
                <TableHeader key={label || source}>
                  {getHeaderLabel(source, label, noTranslation)}
                </TableHeader>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {slicedRecords.map((record) => {
              const injectedRowStyle = rowStyle
                ? (rowStyle(record, theme) as CSSProperties)
                : undefined;

              const injectedRowCellsStyle = rowCellsStyle
                ? (rowCellsStyle(record, theme) as CSSProperties)
                : undefined;

              return (
                <TableRow key={record.id} style={injectedRowStyle}>
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

                    const { source } = child.props as BaseFieldProps<BaseRecordField>;

                    return (
                      <TableCell onClick={onRowClick} key={`${record.id}-${source}`}>
                        {cloneElement(child, { record, style: injectedRowCellsStyle })}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
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
    </ListWrapper>
  );
};

DetailedList.displayName = 'DetailedList';

export default DetailedList;

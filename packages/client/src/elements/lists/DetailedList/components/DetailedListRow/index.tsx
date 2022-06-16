import { Children, cloneElement, isValidElement } from 'react';
import type { CSSProperties } from 'styled-components';
import { useTheme } from 'styled-components';

import { BaseFieldProps, BaseRecordField } from '../../../../fields/Fields.types';
import { Checkbox } from '../../../../inputs';
import { TableCell, TableCellCheckbox, TableRow } from './DetailedListRow.styled';
import { DetailedListRowProps } from './DetailedListRow.types';

const DetailedListRow = ({
  rowStyle,
  record,
  onRowClick,
  rowCellsStyle,
  childrenProps,
  onMarkRow,
  checkIsRowSelected,
}: DetailedListRowProps) => {
  const theme = useTheme();
  const injectedRowStyle = rowStyle ? (rowStyle(record, theme) as CSSProperties) : undefined;

  const injectedRowCellsStyle = rowCellsStyle
    ? (rowCellsStyle(record, theme) as CSSProperties)
    : undefined;

  const recordId = record.id;

  return (
    <TableRow key={recordId} style={injectedRowStyle}>
      <TableCellCheckbox>
        <Checkbox onChange={() => onMarkRow(recordId)} checked={checkIsRowSelected(recordId)} />
      </TableCellCheckbox>
      {Children.map(childrenProps, (child) => {
        if (!isValidElement(child)) {
          return null;
        }

        const { source } = child.props as BaseFieldProps<BaseRecordField>;

        return (
          <TableCell onClick={onRowClick} key={`${recordId}-${source}`}>
            {cloneElement(child, { record, style: injectedRowCellsStyle })}
          </TableCell>
        );
      })}
    </TableRow>
  );
};

export default DetailedListRow;

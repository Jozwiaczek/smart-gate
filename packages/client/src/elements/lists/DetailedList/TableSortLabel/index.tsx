import React, { FC } from 'react';

import { ArrowIcon } from '../../../../icons';
import { SortIcon, SortIconWrapper, SortLabelWrapper } from './TableSortLabel.style';
import { TableSortLabelProps } from './TableSortLabel.types';

const TableSortLabel: FC<TableSortLabelProps> = ({ active, direction, sortable, children }) => {
  console.log(sortable);
  return (
    <SortLabelWrapper sortable={sortable}>
      {children}
      {sortable && (
        <SortIconWrapper>
          <SortIcon>
            <ArrowIcon />
          </SortIcon>
        </SortIconWrapper>
      )}
    </SortLabelWrapper>
  );
};

export default TableSortLabel;

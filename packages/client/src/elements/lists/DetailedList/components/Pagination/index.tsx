import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { Select } from '../../../../inputs';
import { SelectOption } from '../../../../inputs/Select/Select.types';
import { PerPage } from '../../DetailedList.types';
import PaginationNumbers from '../PaginationNumbers';
import {
  PageNavigation,
  PaginationButton,
  PaginationWrapper,
  PerPageLabel,
  PerPageWrapper,
  TotalsLabel,
} from './Pagination.styled';
import { PaginationProps } from './Pagination.types';

const Pagination = ({
  perPage,
  setPerPage,
  currentPage,
  setCurrentPage,
  totalRecords,
}: PaginationProps) => {
  const { t } = useTranslation();

  const totalPages = useMemo(
    (): number => Math.ceil(totalRecords / perPage),
    [perPage, totalRecords],
  );

  const changePerPageValue = (selectedOption: SelectOption<PerPage>) => {
    setPerPage(selectedOption.value);
    if (currentPage !== 1) {
      setCurrentPage(1);
    }
  };

  return (
    <PaginationWrapper>
      <PerPageWrapper>
        <PerPageLabel>{t('lists.detailedList.perPage')}:</PerPageLabel>
        <Select<PerPage> openDirection="up" value={perPage} onChange={changePerPageValue}>
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={15}>15</option>
          <option value={25}>25</option>
        </Select>
      </PerPageWrapper>
      <TotalsLabel>
        {perPage * currentPage - perPage + 1}-{Math.min(perPage * currentPage, totalRecords)}&nbsp;
        {t('lists.detailedList.ofTotal')}&nbsp;
        {totalRecords}
      </TotalsLabel>
      {totalPages > 1 && (
        <PageNavigation>
          <PaginationButton
            color="primary"
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            {t('lists.detailedList.prev')}
          </PaginationButton>
          <PaginationNumbers
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={totalPages}
          />
          <PaginationButton
            color="primary"
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            {t('lists.detailedList.next')}
          </PaginationButton>
        </PageNavigation>
      )}
    </PaginationWrapper>
  );
};

Pagination.displayName = 'Pagination';

export default Pagination;

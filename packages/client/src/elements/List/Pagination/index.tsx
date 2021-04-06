import React, { useMemo } from 'react';
import { Select } from 'src/elements';

import {
  PageNavigation,
  PaginationButton,
  PaginationWrapper,
  PerPageLabel,
  PerPageWrapper,
  TotalsLabel,
} from './Pagination.styled';

const Pagination = ({
  perPage,
  setPerPage,
  currentPage,
  setCurrentPage,
  totalRecords,
}: PaginationProps) => {
  const totalPages = useMemo((): number => Math.ceil(totalRecords / perPage), [
    perPage,
    totalRecords,
  ]);

  return (
    <PaginationWrapper>
      <PerPageWrapper>
        <PerPageLabel>Rows per page:</PerPageLabel>
        <Select<number>
          value={perPage}
          onChange={(selectedOption) => setPerPage(selectedOption.value)}
        >
          <option value={5}>5</option>
          <option value={15}>15</option>
          <option value={25}>25</option>
        </Select>
      </PerPageWrapper>
      <TotalsLabel>
        {perPage * currentPage - perPage + 1}-{Math.min(perPage * currentPage, totalRecords)} of{' '}
        {totalRecords}
      </TotalsLabel>
      {totalPages > 1 && (
        <>
          {currentPage !== 1 && (
            <PaginationButton color="primary" onClick={() => setCurrentPage(currentPage - 1)}>
              prev
            </PaginationButton>
          )}
          <PageNavigation>
            {[...Array(totalPages)].map((_, index) => {
              const pageKey = index + 1;
              return (
                <PaginationButton
                  key={pageKey}
                  disabled={pageKey === currentPage}
                  onClick={() => setCurrentPage(pageKey)}
                >
                  {pageKey}
                </PaginationButton>
              );
            })}
            {currentPage !== totalPages && (
              <PaginationButton color="primary" onClick={() => setCurrentPage(currentPage + 1)}>
                next
              </PaginationButton>
            )}
          </PageNavigation>
        </>
      )}
    </PaginationWrapper>
  );
};

Pagination.displayName = 'Pagination';

export default Pagination;

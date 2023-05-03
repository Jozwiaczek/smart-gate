import { PerPage } from '../../DetailedList.types';

interface PaginationProps {
  perPage: PerPage;
  setPerPage: (perPage: PerPage) => void;
  currentPage: number;
  setCurrentPage: (currentPage: number) => void;
  totalRecords: number;
}

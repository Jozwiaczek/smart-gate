interface BasePaginationButtonProps {
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

interface PaginationNumbersProps extends BasePaginationButtonProps {
  totalPages: number;
}

interface LastNumButtonProps {
  totalPages: number;
  setCurrentPage: (page: number) => void;
}

type FirstNumButtonProps = BasePaginationButtonProps;

interface XNumButtonsProps extends BasePaginationButtonProps {
  total: number;
  getPageKey: (currentIndex: number) => number;
}

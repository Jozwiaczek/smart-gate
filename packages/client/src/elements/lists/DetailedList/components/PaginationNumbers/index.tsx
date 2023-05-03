import { PAGE_NUMBERS_SHOW_KEY } from './PaginationNumbers.constants';
import { PaginationNumButton, SpaceSymbolContainer } from './PaginationNumbers.styled';

interface SpaceSymbolProps {
  hidden?: boolean;
}

const SpaceSymbol = ({ hidden = false }: SpaceSymbolProps) => (
  <SpaceSymbolContainer hidden={hidden}>...</SpaceSymbolContainer>
);

const LastNumButton = ({ totalPages, setCurrentPage }: LastNumButtonProps) => (
  <PaginationNumButton onClick={() => setCurrentPage(totalPages)}>{totalPages}</PaginationNumButton>
);

const FirstNumButton = ({ setCurrentPage, currentPage }: FirstNumButtonProps) => (
  <PaginationNumButton onClick={() => setCurrentPage(1)} disabled={currentPage === 1}>
    1
  </PaginationNumButton>
);

const XNumButtons = ({ total, getPageKey, currentPage, setCurrentPage }: XNumButtonsProps) => {
  return (
    <>
      {[...Array(total)].map((_, index) => {
        const pageKey = getPageKey(index);
        return (
          <PaginationNumButton
            key={pageKey}
            disabled={pageKey === currentPage}
            onClick={() => setCurrentPage(pageKey)}
          >
            {pageKey}
          </PaginationNumButton>
        );
      })}
    </>
  );
};

const PaginationNumbers = ({ totalPages, currentPage, setCurrentPage }: PaginationNumbersProps) => {
  if (totalPages <= PAGE_NUMBERS_SHOW_KEY + 1) {
    return (
      <XNumButtons
        getPageKey={(currentIndex) => currentIndex + 1}
        total={totalPages}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
    );
  }

  if (
    currentPage >= PAGE_NUMBERS_SHOW_KEY &&
    currentPage <= totalPages - PAGE_NUMBERS_SHOW_KEY + 1
  ) {
    return (
      <>
        <FirstNumButton setCurrentPage={setCurrentPage} currentPage={currentPage} />
        <SpaceSymbol />
        <XNumButtons
          getPageKey={(currentIndex) => currentPage - 1 + currentIndex}
          total={PAGE_NUMBERS_SHOW_KEY - 1}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
        <SpaceSymbol />
        <LastNumButton totalPages={totalPages} setCurrentPage={setCurrentPage} />
      </>
    );
  }

  if (currentPage > totalPages - PAGE_NUMBERS_SHOW_KEY) {
    return (
      <>
        <FirstNumButton setCurrentPage={setCurrentPage} currentPage={currentPage} />
        <SpaceSymbol />
        <XNumButtons
          getPageKey={(currentIndex) => totalPages - PAGE_NUMBERS_SHOW_KEY + currentIndex + 1}
          total={PAGE_NUMBERS_SHOW_KEY}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
        <SpaceSymbol hidden />
      </>
    );
  }

  return (
    <>
      <FirstNumButton setCurrentPage={setCurrentPage} currentPage={currentPage} />
      <SpaceSymbol hidden />
      <XNumButtons
        getPageKey={(currentIndex) => currentIndex + 2}
        total={PAGE_NUMBERS_SHOW_KEY}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
      <SpaceSymbol />
      <LastNumButton totalPages={totalPages} setCurrentPage={setCurrentPage} />
    </>
  );
};

export default PaginationNumbers;

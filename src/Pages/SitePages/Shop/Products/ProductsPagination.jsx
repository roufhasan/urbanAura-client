import { useEffect } from "react";
import Card from "../../../../components/Cards/Card/Card";
import { scrollToTop } from "../../../../utils/scrollUtils";
import CardList from "../../../../components/Cards/CardList/CardList";
import SkeletonLoader from "../../../../components/Loaders/SkeletonLoader/SkeletonLoader";

const ProductsPagination = ({
  currentPage,
  endIndex,
  gridView,
  itemsPerPage,
  loading,
  sortedProducts,
  startIndex,
  totalPages,
  setCurrentPage,
  setTotalPages,
}) => {
  // previous and next button disable status
  const prevDisabled = currentPage === 1;
  const nextDisabled = currentPage === totalPages;

  // items to display
  const itemsToDisplay = sortedProducts.slice(startIndex, endIndex);

  // page change by click on page number
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    scrollToTop();
  };

  // previous page button
  const handlePrevClick = () => {
    scrollToTop();
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // next page button
  const handleNextClick = () => {
    scrollToTop();
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // render page num buttons
  const renderPageButtons = () => {
    const buttons = [];
    let startIndex, endIndex;

    if (currentPage <= 2) {
      startIndex = 1;
      endIndex = Math.min(3, totalPages);
    } else {
      startIndex = Math.max(1, currentPage - 1);
      endIndex = Math.min(totalPages, currentPage + 1);

      if (currentPage >= totalPages - 1) {
        startIndex = Math.max(1, totalPages - 2);
        endIndex = totalPages;
      }
    }

    for (let i = startIndex; i <= endIndex; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          disabled={i === currentPage}
          className={`rounded-[10px] px-4 py-3 text-lg md:px-6 md:py-4 md:text-xl ${
            i === currentPage ? "bg-[#d4a017] text-white" : "bg-cream"
          }`}
        >
          {i}
        </button>,
      );
    }

    return buttons;
  };

  useEffect(() => {
    scrollToTop();
    setTotalPages(Math.ceil(sortedProducts.length / itemsPerPage));
  }, [itemsPerPage, currentPage]);

  return (
    <section className="px-[4%] pb-[85px] pt-16 md:px-[7%]">
      {/* produtcs container */}
      {gridView ? (
        <div
          className={`grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-10 xl:grid-cols-4`}
        >
          {loading && <SkeletonLoader />}
          {!loading &&
            itemsToDisplay &&
            itemsToDisplay.length > 0 &&
            itemsToDisplay.map((product) => (
              <Card key={product._id} product={product} />
            ))}
        </div>
      ) : (
        <div className={`grid grid-cols-1 gap-y-8 md:gap-x-8 md:gap-y-10`}>
          {itemsToDisplay &&
            itemsToDisplay.length > 0 &&
            itemsToDisplay.map((product) => (
              <CardList key={product._id} product={product} />
            ))}
        </div>
      )}

      {/* pagination */}
      <div className="mt-[70px] flex items-center justify-center gap-5 md:gap-9">
        {currentPage > 1 && (
          <button
            onClick={handlePrevClick}
            disabled={prevDisabled}
            className={`bg-cream rounded-[10px] px-4 py-2 font-light md:px-7 md:py-4 md:text-lg`}
          >
            Prev
          </button>
        )}
        {renderPageButtons()}
        {currentPage < totalPages && (
          <button
            onClick={handleNextClick}
            disabled={nextDisabled}
            className={`bg-cream rounded-[10px] px-4 py-2 font-light md:px-7 md:py-4 md:text-lg`}
          >
            Next
          </button>
        )}
      </div>
    </section>
  );
};

export default ProductsPagination;

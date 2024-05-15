import { useEffect } from "react";
import Card from "../../../../components/Card/Card";
import { scrollToTop } from "../../../../utils/scrollUtils";

const Products = ({
  currentPage,
  endIndex,
  gridView,
  itemsPerPage,
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
          className={`rounded-[10px] px-6 py-4 text-xl ${
            i === currentPage ? "bg-[#d4a017] text-white" : "bg-[#f9f1e7]"
          }`}
        >
          {i}
        </button>,
      );
    }

    return buttons;
  };

  useEffect(() => {
    setTotalPages(Math.ceil(sortedProducts.length / itemsPerPage));
  }, [itemsPerPage]);

  useEffect(() => {
    scrollToTop();
  }, [currentPage]);

  return (
    <section className="px-[4%] pb-[85px] pt-16 md:px-[7%]">
      <div
        className={`grid grid-cols-1 gap-y-8 md:gap-y-10 ${gridView && "md:grid-cols-4 md:gap-x-8"}`}
      >
        {itemsToDisplay &&
          itemsToDisplay.length > 0 &&
          itemsToDisplay.map((product) => (
            <Card key={product.id} product={product} />
          ))}
      </div>

      {/* pagination */}
      <div className="mt-[70px] flex items-center justify-center gap-9">
        {currentPage > 1 && (
          <button
            onClick={handlePrevClick}
            disabled={prevDisabled}
            className={`rounded-[10px] bg-[#f9f1e7] px-7 py-4 text-lg font-light`}
          >
            Prev
          </button>
        )}
        {renderPageButtons()}
        {currentPage < totalPages && (
          <button
            onClick={handleNextClick}
            disabled={nextDisabled}
            className={`rounded-[10px] bg-[#f9f1e7] px-7 py-4 text-lg font-light`}
          >
            Next
          </button>
        )}
      </div>
    </section>
  );
};

export default Products;

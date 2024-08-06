const Pagination = ({
  currentPage,
  totalPages,
  prevDisabled,
  nextDisabled,
  handlePrevClick,
  handleNextClick,
}) => {
  return (
    <div className="flex w-full items-center justify-center gap-x-8 py-10 text-center">
      <button
        onClick={handlePrevClick}
        disabled={prevDisabled}
        className={`rounded-md  px-2 py-1 ${prevDisabled ? "bg-gray-300 text-black" : "bg-primary text-white"}`}
      >
        Prev
      </button>
      <p>
        {currentPage} of {totalPages}
      </p>
      <button
        onClick={handleNextClick}
        disabled={nextDisabled}
        className={`rounded-md  px-2 py-1 ${nextDisabled ? "bg-gray-300 text-black" : "bg-primary text-white"}`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;

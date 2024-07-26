// images
import gridIcon from "../../../../assets/logo/grid-big-round.svg";
import listIcon from "../../../../assets/logo/view-list.svg";

const SortView = ({
  endIndex,
  handleSort,
  itemsPerPage,
  sortedProducts,
  startIndex,
  setGridView,
  setItemsPerPage,
}) => {
  const handleItemsPerPage = (e) => {
    const itemsPerPageValue = e.target.value;
    setItemsPerPage(Math.ceil(itemsPerPageValue));
  };

  return (
    <div className="flex flex-wrap items-center gap-y-6 bg-[#F9F1E7] px-[4%] py-5 sm:justify-between md:px-[7%]">
      {/* left buttons */}
      <div className="flex w-full items-center justify-between gap-3 sm:w-fit md:gap-0">
        <div className="flex items-center gap-2 sm:gap-3 md:gap-4 xl:gap-6">
          <p className="lg:text-xl">View:</p>
          <img
            className="size-6 cursor-pointer lg:size-7"
            onClick={() => setGridView(true)}
            src={gridIcon}
            alt="grid icon"
            loading="lazy"
          />
          <img
            className="size-5 cursor-pointer lg:size-6"
            onClick={() => setGridView(false)}
            src={listIcon}
            alt="grid icon"
            loading="lazy"
          />
        </div>
        {/* horizontal divider */}
        <div className="mx-5 hidden h-9 w-[2px] bg-[#9f9f9f] md:block xl:ml-[30px] xl:mr-[34px]"></div>
        <p className="text-sm font-light text-[#9f9f9f] md:text-base md:text-black">
          Showing {startIndex + 1}–
          {endIndex < sortedProducts.length ? endIndex : sortedProducts.length}{" "}
          of {sortedProducts.length} results
        </p>
      </div>

      {/* right side */}
      <div className="flex w-full flex-wrap items-center justify-between gap-2 sm:w-fit md:gap-4 lg:gap-7">
        <div className="flex items-center gap-2 lg:text-xl xl:gap-4">
          <p>Show:</p>
          <input
            className="size-11 text-center text-[#9f9f9f] lg:size-[55px]"
            type="text"
            name="itemsPerPage"
            id="itemsPerPage"
            defaultValue={itemsPerPage}
            onBlur={handleItemsPerPage}
          />
        </div>
        <div className="flex items-center gap-2 lg:text-xl xl:gap-4">
          <p className="w-16 md:w-full">Sort by:</p>
          <select
            name="sortings"
            id="sortings"
            className="h-11 w-20 py-1 text-[#9f9f9f] lg:h-auto lg:w-fit lg:py-3 lg:pl-7"
            onChange={handleSort}
          >
            <option value="default">Default</option>
            <option value="asc">Price (Low to High)</option>
            <option value="desc">Price (High to Low)</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default SortView;

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
    <div className="flex flex-wrap items-center justify-end gap-y-4 bg-[#F9F1E7] px-[4%] py-5 md:justify-between md:px-[7%]">
      {/* left buttons */}
      <div className="hidden items-center md:flex">
        <div className="flex items-center gap-3 md:gap-6">
          <p className="md:text-xl">View:</p>
          <img
            src={gridIcon}
            alt="grid icon"
            onClick={() => setGridView(true)}
            className="size-6 cursor-pointer md:size-7"
          />
          <img
            src={listIcon}
            alt="grid icon"
            onClick={() => setGridView(false)}
            className="size-5 cursor-pointer md:size-6"
          />
        </div>
        {/* horizontal divider */}
        <div className="ml-[30px] hidden h-9 w-[2px] bg-[#9F9F9F] md:mr-[34px] md:block"></div>
        <p>
          Showing {startIndex + 1}–
          {endIndex < sortedProducts.length ? endIndex : sortedProducts.length}{" "}
          of {sortedProducts.length} results
        </p>
      </div>

      {/* right side */}
      <div className="flex items-center justify-between gap-7">
        <div className="flex items-center gap-2 md:gap-4 md:text-xl">
          <p>Show</p>
          <input
            className="size-[55px] text-center text-[#9f9f9f]"
            type="text"
            name="itemsPerPage"
            id="itemsPerPage"
            defaultValue={itemsPerPage}
            onBlur={handleItemsPerPage}
          />
        </div>
        <div className="flex items-center gap-2 md:gap-4 md:text-xl">
          <p>Sort by</p>
          <select
            name="sortings"
            id="sortings"
            className="py-1 text-[#9f9f9f] md:py-3 md:pl-7"
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

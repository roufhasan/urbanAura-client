import Card from "../../../../components/Card/Card";

const Products = ({
  gridView,
  itemsToDisplay,
  totalPages,
  handlePageChange,
}) => {
  console.log(itemsToDisplay);
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

      <div className="mt-8 flex justify-center">
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            onClick={() => handlePageChange(index + 1)}
            key={index}
            className="mx-2 rounded border px-4 py-2"
          >
            {index + 1}
          </button>
        ))}
      </div>

      {/* pagination */}
      {/* <div className="mt-[70px] flex items-center justify-center gap-5 text-lg md:gap-9 md:text-xl">
        <div className="rounded-[10px] bg-[#b88e2f] px-5 py-3 text-white md:px-7 md:py-4">
          1
        </div>
        <div className="rounded-[10px] bg-[#f9f1e7] px-5 py-3 md:px-7 md:py-4">
          2
        </div>
        <div className="rounded-[10px] bg-[#f9f1e7] px-5 py-3 md:px-7 md:py-4">
          3
        </div>
        <div className="rounded-[10px] bg-[#f9f1e7] px-5 py-3 md:px-7 md:py-4">
          Next
        </div>
      </div> */}
    </section>
  );
};

export default Products;

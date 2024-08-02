import axios from "axios";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { BsPlus } from "react-icons/bs";
import { FaBoxOpen } from "react-icons/fa";
import { Link } from "react-router-dom";
import { scrollToTop } from "../../../../utils/scrollUtils";
import Pagination from "../../../../components/Pagination/Pagination";
import ProductListAdmin from "../../../../components/ProductListAdmin/ProductListAdmin";

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [refetch, setRefetch] = useState(false);
  const [sortValue, setSortValue] = useState("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  // products pagination start index and end index
  const startIndex = (currentPage - 1) * 5;
  const endIndex = startIndex + 5;

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

  // previous and next button disable status
  const prevDisabled = currentPage === 1;
  const nextDisabled = currentPage === totalPages;

  // items to display
  const itemsToDisplay = products.slice(startIndex, endIndex);

  // Products sorting function
  const handleSort = (e) => {
    setSortValue(e.target.value);
  };

  useEffect(() => {
    axios
      .get(
        `https://urbanaura-server.up.railway.app/products?sortBy=${sortValue}`,
      )
      .then((res) => {
        setProducts(res.data);
        setTotalPages(Math.ceil(res.data.length / 5));
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, [refetch, sortValue]);

  return (
    <section className="product-management">
      {/* Change page title */}
      <Helmet>
        <title>Manage Products - UrbanAura Furniture</title>
      </Helmet>
      {/* Total products and new product button */}
      <div className="flex flex-wrap items-center justify-between gap-y-2 bg-white px-[4%] py-7 shadow-sm md:px-5">
        <h3 className="flex items-center gap-1 font-semibold sm:text-xl">
          <FaBoxOpen size={32} color="#b88e2f" /> Total Products:{" "}
          <span>{products.length}</span>
        </h3>
        <Link
          to="/dashboard/add-product"
          className="flex items-center gap-0.5 rounded-md border border-[#b88e2f] bg-[#b88e2f] px-1.5 py-0.5 text-xs font-medium text-white transition-all hover:bg-[#967426]"
        >
          <BsPlus size={22} />
          Add New Item
        </Link>
      </div>
      {/* Products list container */}
      <div className="mt-6 divide-y bg-white">
        <div className="flex w-full items-center justify-between gap-2 px-[4%] py-6 md:px-5">
          <p className="w-full text-sm font-medium text-gray-700">
            Manage all of your products
          </p>
          <div className="flex w-full items-center justify-end gap-2">
            <p className="text-sm font-medium text-gray-700">Sort By:</p>
            <select
              onChange={handleSort}
              id="product_order_list"
              className="rounded bg-[#ffe5a8] px-2 py-1 text-sm outline-none"
            >
              <option value="desc" className="bg-[#ffe5a8]">
                Latest (desc)
              </option>
              <option value="asc" className="bg-[#ffe5a8]">
                Oldest (asc)
              </option>
            </select>
          </div>
        </div>
        {itemsToDisplay && itemsToDisplay.length > 0 ? (
          itemsToDisplay.map((product) => (
            <ProductListAdmin
              key={product._id}
              product={product}
              products={products}
              refetch={refetch}
              setProducts={setProducts}
              setRefetch={setRefetch}
            />
          ))
        ) : (
          <div className="flex h-[calc(100vh-120px)] w-full items-center justify-center">
            <div className="h-full w-full rounded-md bg-white px-[4%] py-8 text-center md:px-5">
              <FaBoxOpen className="mx-auto mb-4 h-12 w-12 text-gray-400" />
              <h2
                className="mb-2 text-lg font-semibold"
                style={{ color: "#b88e2f" }}
              >
                No Products Added!
              </h2>
              <p className="text-gray-600">
                No recent products have been added. When new products added, you
                will be able to view and manage them here.
              </p>
            </div>
          </div>
        )}

        {/* Pagination button */}
        <Pagination
          {...{
            currentPage,
            totalPages,
            prevDisabled,
            nextDisabled,
            handlePrevClick,
            handleNextClick,
          }}
        />
      </div>
    </section>
  );
};

export default ProductManagement;

import axios from "axios";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { BsPlus } from "react-icons/bs";
import { FaBoxOpen } from "react-icons/fa";
import { RiDeleteBinLine, RiEdit2Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import { formatPrice } from "../../../../utils/formatPrice";
import { scrollToTop } from "../../../../utils/scrollUtils";
import toast from "react-hot-toast";

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
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

  useEffect(() => {
    axios
      .get("http://localhost:5000/products")
      .then((res) => {
        setProducts(res.data);
        setTotalPages(Math.ceil(res.data.length / 5));
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const handleDeleteProduct = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:5000/products/${id}`);
      if (res.data.deletedCount > 0) {
        toast.success("Item Deleted Successfully!");
        const updatedProducts = products.filter(
          (product) => product._id !== id,
        );
        setProducts(updatedProducts);
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong!");
    }
  };

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
        {itemsToDisplay && itemsToDisplay.length > 0 ? (
          itemsToDisplay.map((product) => (
            <div
              key={product._id}
              className="flex justify-between px-[4%] py-4 md:px-5"
            >
              <div className="flex gap-7">
                <Link to={`/products/${product._id}`} className="">
                  <img
                    loading="lazy"
                    src={product.thumbnail}
                    alt=""
                    className="size-24 object-cover object-center transition-all hover:scale-95"
                  />
                </Link>
                <div className="space-y-0.5">
                  <Link
                    to={`/products/${product._id}`}
                    className="mb-1 inline-block text-lg font-semibold transition-all hover:scale-95"
                  >
                    {product.title}
                  </Link>
                  <p className="text-sm text-gray-500">{product.sub_title}</p>
                  <p className="text-sm text-gray-500">
                    Price: ${formatPrice(product.price.original)}
                  </p>
                  <p className="text-sm text-gray-500">Discount: 9%</p>
                </div>
              </div>
              <div className="flex flex-col justify-between sm:flex-row sm:items-start sm:gap-2.5">
                <button className="flex items-center gap-1 rounded-md bg-blue-400 px-1  py-1 text-sm text-white transition-all hover:bg-blue-600">
                  <RiEdit2Line /> Edit
                </button>
                <button
                  onClick={() => handleDeleteProduct(product._id)}
                  className="flex items-center gap-1 rounded-md bg-red-400 px-1  py-1 text-sm text-white transition-all hover:bg-red-600"
                >
                  <RiDeleteBinLine /> Delete
                </button>
              </div>
            </div>
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

        <div className="flex w-full items-center justify-center gap-x-8 py-10 text-center">
          <button
            onClick={handlePrevClick}
            disabled={prevDisabled}
            className={`rounded-md  px-2 py-1 ${prevDisabled ? "bg-gray-300 text-black" : "bg-[#b88e2f] text-white"}`}
          >
            Prev
          </button>
          <p>
            {currentPage} of {totalPages}
          </p>
          <button
            onClick={handleNextClick}
            disabled={nextDisabled}
            className={`rounded-md  px-2 py-1 ${nextDisabled ? "bg-gray-300 text-black" : "bg-[#b88e2f] text-white"}`}
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductManagement;

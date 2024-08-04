import { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { RiDeleteBinLine, RiEdit2Line } from "react-icons/ri";
import ProductUpdateModal from "../Modals/ProductUpdateModal/ProductUpdateModal";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { formatPrice } from "../../utils/formatPrice";

const ProductListAdmin = ({
  product,
  products,
  refetch,
  setProducts,
  setRefetch,
}) => {
  const { user } = useAuth();
  const { axiosSecure } = useAxiosSecure();
  const [modalOpen, setModalOpen] = useState(false);

  // delete a product
  const handleDeleteProduct = async (id) => {
    try {
      const res = await axiosSecure.delete(`/admin/products/${id}`, {
        params: { userEmail: user?.email },
      });
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
    <div>
      <div
        key={product._id}
        className="flex justify-between px-[4%] py-4 md:px-5"
      >
        <div className="flex gap-7">
          <Link to={`/products/${product._id}`} className="">
            <img
              className="size-24 object-cover object-center transition-all hover:scale-95"
              src={product.thumbnail}
              alt={product.title}
              loading="lazy"
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
            <p className="text-sm text-gray-500">
              Discount: {product.price?.discount_percent || 0}%
            </p>
          </div>
        </div>
        <div className="flex flex-col justify-between sm:flex-row sm:items-start sm:gap-2.5">
          <button
            onClick={() => setModalOpen(true)}
            className="flex items-center gap-1 rounded-md bg-gray-100 px-1  py-1 text-sm text-gray-400 transition-all hover:bg-gray-200 hover:text-gray-600"
          >
            <RiEdit2Line /> Edit
          </button>
          <button
            onClick={() => handleDeleteProduct(product._id)}
            className="flex items-center gap-1 rounded-md bg-red-100 px-1  py-1 text-sm text-red-400 transition-all hover:bg-red-200 hover:text-red-600"
          >
            <RiDeleteBinLine /> Delete
          </button>
        </div>
      </div>
      {/* Update product info modal */}
      <ProductUpdateModal
        product={product}
        refetch={refetch}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        setRefetch={setRefetch}
      />
    </div>
  );
};

export default ProductListAdmin;

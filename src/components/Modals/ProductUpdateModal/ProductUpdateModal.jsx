import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { BsX } from "react-icons/bs";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ProductUpdateModal = ({
  product,
  modalOpen,
  refetch,
  setModalOpen,
  setRefetch,
}) => {
  const { user } = useAuth();
  const { axiosSecure } = useAxiosSecure();
  const { register, handleSubmit, reset } = useForm();

  // update a product info
  const handleProductUpdate = async (updatedProduct) => {
    try {
      const res = await axiosSecure.put(
        `/admin/products/${product._id}`,
        updatedProduct,
        { params: { userEmail: user?.email } },
      );
      if (res.data.modifiedCount > 0) {
        reset();
        setModalOpen(false);
        toast.success("Product updated successfully!");
        setRefetch(!refetch);
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong!");
    }
  };

  // Form Submit handler
  const onSubmit = (data) => {
    const updatedProduct = {
      ...product,
      title: data.title,
      sub_title: data.sub_title,
      price: {
        original: parseFloat(data.price),
      },
    };

    if (data.discount > 0) {
      const discounted =
        parseFloat(data.price) -
        (parseFloat(data.price) * parseInt(data.discount)) / 100;

      updatedProduct.price.discount_percent = parseInt(data.discount);
      updatedProduct.price.discounted = parseFloat(discounted.toFixed(2));
    }

    delete updatedProduct._id;

    handleProductUpdate(updatedProduct);
  };

  return (
    <>
      <Dialog
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        className="relative z-50 font-Poppins"
      >
        <div className="fixed inset-0 mx-auto flex w-screen max-w-[1440px] justify-center overflow-y-auto bg-black/50 px-[4%] pt-10">
          <DialogPanel className="h-fit w-full max-w-2xl rounded-xl border bg-white px-6 py-8">
            <DialogTitle className="flex items-center justify-between">
              <p className="text-lg font-semibold">Update Product Info.</p>
              <BsX
                onClick={() => setModalOpen(false)}
                size={26}
                className="cursor-pointer transition-all hover:text-primary"
              />
            </DialogTitle>
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Title and subtitle input tag */}
              <div className="w-full gap-6 md:flex">
                <div className="w-full">
                  <label
                    htmlFor="title"
                    className="text-cadetGray mb-2 mt-10 block w-full"
                  >
                    Title
                  </label>
                  <input
                    className="block w-full rounded-[10px] border px-3 py-2 text-gray-500 outline-none focus:border-gray-500 focus:text-black"
                    type="text"
                    id="title"
                    defaultValue={product.title}
                    {...register("title")}
                  />
                </div>
                <div className="w-full">
                  <label
                    htmlFor="sub_title"
                    className="text-cadetGray mb-2 mt-10 block w-full"
                  >
                    Subtitle
                  </label>
                  <input
                    className="block w-full rounded-[10px] border px-3 py-2 text-gray-500 outline-none focus:border-gray-500 focus:text-black"
                    type="text"
                    id="sub_title"
                    defaultValue={product.sub_title}
                    {...register("sub_title")}
                  />
                </div>
              </div>
              {/* Price and discount input tag */}
              <div className="w-full gap-6 md:flex">
                <div className="w-full">
                  <label
                    htmlFor="price"
                    className="text-cadetGray mb-2 mt-10 block w-full"
                  >
                    Price <span className="text-xs">($USD)</span>
                  </label>
                  <input
                    className="block w-full rounded-[10px] border px-3 py-2 text-gray-500 outline-none focus:border-gray-500 focus:text-black"
                    type="text"
                    id="price"
                    defaultValue={product.price.original}
                    {...register("price")}
                  />
                </div>
                <div className="w-full">
                  <label
                    htmlFor="discount"
                    className="text-cadetGray mb-2 mt-10 block w-full"
                  >
                    Discount %
                  </label>
                  <input
                    className="block w-full rounded-[10px] border px-3 py-2 text-gray-500 outline-none focus:border-gray-500 focus:text-black"
                    type="number"
                    id="discount"
                    defaultValue={
                      product.price.discount_percent
                        ? product.price.discount_percent
                        : 0
                    }
                    {...register("discount")}
                  />
                </div>
              </div>

              <div className="mt-10 flex items-center justify-center gap-6">
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setModalOpen(false)}
                  className="rounded border border-primary px-6 py-1 hover:bg-primary hover:text-white"
                >
                  Cancel
                </motion.button>
                <motion.button
                  className="rounded bg-primary px-6 py-1 text-white hover:bg-[#a07c28]"
                  whileTap={{ scale: 0.9 }}
                  type="submit"
                >
                  Update
                </motion.button>
              </div>
            </form>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
};

export default ProductUpdateModal;

import { useState } from "react";
import axios from "axios";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { BsArrowLeft, BsInfoCircle } from "react-icons/bs";
import AddImages from "./AddImages/AddImages";
import { uploadImagesToImgbb } from "../../../../utils/imageUpload";

const AddProducts = () => {
  const [selectedImages, setSelectedImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      is_new: false,
    },
  });

  const addNewProduct = async (newProduct) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/products",
        newProduct,
      );
      if (res.data.acknowledged && res.data.insertedId) {
        toast.success("New product added successfully!");
      } else {
        toast.error("Failed to add new product. Please try again.");
      }
    } catch (err) {
      console.error("Error adding new product:", err);
      toast.error("Error adding new product. Please try again.");
    }
  };

  const onSubmit = async (data) => {
    try {
      if (selectedImages.length < 5) {
        return toast.error("Select at least 5 images!");
      }

      const uploadResults = await uploadImagesToImgbb(selectedImages);
      const uploadedImages = uploadResults.map((result) => result.url);

      if (uploadedImages.length < 5) {
        return toast.error(
          "Not all images could be uploaded. Please try again.",
        );
      }

      // First image is thumbnail, the rest are gallery images
      const thumbnail = uploadedImages[0];
      const gallery = uploadedImages.slice(1);

      const tagsArray = data.tags.split(",");

      const newProduct = {
        category: data.category,
        title: data.title,
        sub_title: data.sub_title,
        is_new: data.is_new === "true",
        tags: tagsArray,
        price: {
          original: parseFloat(data.originalPrice),
        },
        thumbnail,
        gallery,
      };

      if (data.discount_percent > 0) {
        const discounted =
          parseFloat(data.originalPrice) -
          (parseFloat(data.originalPrice) * parseInt(data.discount_percent)) /
            100;

        newProduct.price.discount_percent = parseInt(data.discount_percent);
        newProduct.price.discounted = parseFloat(discounted.toFixed(2));
      }

      // Add new product
      await addNewProduct(newProduct);
    } catch (err) {
      console.error("Error submitting form:", err);
      toast.error("Error submitting form. Please try again.");
    }
  };

  return (
    <section className="w-full pb-20">
      {/* Change page title */}
      <Helmet>
        <title>Add Product - UrbanAura Furniture</title>
      </Helmet>
      {/* Page heading */}
      <div className="flex h-full w-full items-center gap-3 bg-white px-[4%] py-7 shadow-sm md:px-5">
        <Link
          to="/dashboard/orders"
          className="grid size-10 place-items-center rounded border shadow-sm transition-all hover:border-transparent hover:bg-[#b88e2f] hover:text-white"
        >
          <BsArrowLeft className="text-xl" />
        </Link>
        <div>
          <p className="text-xs text-gray-400">Back to product list</p>
          <h3 className="text-xl font-semibold">Add New Product</h3>
        </div>
      </div>

      {/* New Product Info Form */}
      <form
        className="mt-6 grid grid-cols-12 gap-5 px-[4%] md:px-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* General Information */}
        <div className="col-span-12 rounded-lg border bg-white px-4 pb-4 pt-6 shadow-sm lg:col-span-8">
          <h4 className="mb-6 font-semibold">General Information</h4>
          <label
            htmlFor="title"
            className={`text-sm ${errors.title ? "text-red-600" : "text-gray-600"}`}
          >
            Product Title{errors.title && "*"}
          </label>
          <br />
          <input
            className="mb-2 mt-1 w-full rounded-md border bg-[#f8fafb] px-2 py-1.5 outline-none"
            type="text"
            id="title"
            placeholder="Haze"
            {...register("title", { required: true })}
          />
          <br />
          <label
            htmlFor="sub_title"
            className={`text-sm ${errors.sub_title ? "text-red-600" : "text-gray-600"}`}
          >
            Subtitle{errors.sub_title && "*"}
          </label>
          <br />
          <input
            className="mb-2 mt-1 w-full rounded-md border bg-[#f8fafb] px-2 py-1.5 outline-none"
            type="text"
            id="sub_title"
            placeholder="Modern Loveseat"
            {...register("sub_title", { required: true })}
          />
          <br />
          <label
            htmlFor="overview"
            className={`text-sm ${errors.overview ? "text-red-600" : "text-gray-600"}`}
          >
            Overview{errors.overview && "*"}
          </label>
          <br />
          <textarea
            className="mt-1 min-h-24 w-full rounded-md border bg-[#f8fafb] px-2 py-1.5 outline-none"
            id="overview"
            {...register("overview", { required: true })}
          />
        </div>
        {/* Product Images */}
        <AddImages
          register={register}
          errors={errors}
          selectedImages={selectedImages}
          setSelectedImages={setSelectedImages}
          imagePreviews={imagePreviews}
          setImagePreviews={setImagePreviews}
        />
        {/* Pricing */}
        <div className="col-span-12 rounded-lg border bg-white px-4 pb-4 pt-6 shadow-sm lg:col-span-8">
          <h4 className="mb-6 font-semibold">Pricing</h4>
          <label
            htmlFor="originalPrice"
            className={`text-sm ${errors.originalPrice ? "text-red-600" : "text-gray-600"}`}
          >
            Base Price{errors.originalPrice && "*"}
          </label>
          <br />
          <div className="relative">
            <input
              className="mb-2 mt-1 w-full rounded-md border bg-[#f8fafb] px-6 py-1.5 outline-none"
              type="text"
              id="originalPrice"
              {...register("originalPrice", { required: true })}
            />
            <span className="absolute left-2 top-1/2 -translate-y-1/2 pb-1 text-lg">
              $
            </span>
          </div>
          <div className="flex w-full gap-4">
            <div className="w-full">
              <label
                htmlFor="discount_percent"
                className="text-sm text-gray-600"
              >
                Discount Percentage (%){errors.discount_percent && "*"}
              </label>
              <br />
              <input
                className="mb-2 mt-1 w-full rounded-md border bg-[#f8fafb] px-2 py-1.5 outline-none"
                type="number"
                id="discount_percent"
                {...register("discount_percent")}
              />
            </div>
            <div className="w-full">
              <label htmlFor="is_new" className="text-sm text-gray-600">
                Is New
              </label>
              <br />
              <select
                className="mb-2 mt-1 w-full rounded-md border bg-[#f8fafb] px-2 py-1.5 outline-none"
                id="is_new"
                {...register("is_new")}
              >
                <option value="false">No</option>
                <option value="true">Yes</option>
              </select>
            </div>
          </div>
        </div>

        {/* Category */}
        <div className="col-span-12 rounded-lg border bg-white px-4 pb-4 pt-6 shadow-sm lg:col-span-4">
          <h4 className="mb-6 font-semibold">Category</h4>
          <label htmlFor="category" className="text-sm text-gray-600">
            Product Category
          </label>
          <br />
          <select
            className="mb-2 mt-1 w-full rounded-md border bg-[#f8fafb] px-2 py-1.5 outline-none"
            id="category"
            {...register("category")}
          >
            <option value="dining">Dining</option>
            <option value="Living">Living</option>
            <option value="bedroom">Bedroom</option>
            <option value="office">Office</option>
            <option value="outdoor">Outdoor</option>
            <option value="kitchen">Kitchen</option>
            <option value="bathroom">Bathroom</option>
            <option value="home decor">Home Decor</option>
          </select>
          <br />
          <label
            htmlFor="tags"
            className={`mb-1 text-sm ${errors.tags ? "text-red-600" : "text-gray-600"}`}
          >
            <div className="flex items-center gap-1">
              Tags{errors.tags && "*"}
              <span
                className="group tooltip font-normal"
                data-tip="Don't use space after comma (,)"
              >
                <BsInfoCircle
                  className={
                    errors.tags
                      ? "text-red-500"
                      : "text-gray-500 transition-all group-hover:text-black"
                  }
                />
              </span>
            </div>
            {errors.tags && (
              <p className="text-xs text-red-600">{errors.tags.message}</p>
            )}
          </label>
          <input
            className="mb-2 mt-1 w-full rounded-md border bg-[#f8fafb] px-2 py-1.5 outline-none"
            id="tags"
            type="text"
            placeholder="bedroom,chair,bed etc.."
            {...register("tags", {
              required: true,
              pattern: {
                value: /^[^\s,]+(,[^\s,]+)*$/,
                message: "Tags must be comma-separated and contain no spaces",
              },
            })}
          ></input>
        </div>

        <div className="col-span-12 px-4 pb-4 pt-6 lg:col-span-8">
          <p className="mb-6 max-w-md text-sm text-gray-500">
            Please note: This website is hosted on a free platform. Sometimes
            image uploads may not work as expected.
          </p>
          <div className="flex items-center justify-between">
            <Link
              to="/dashboard/products"
              className="rounded-md border bg-white px-4 py-1 shadow-sm transition-all hover:bg-[#b88e2f] hover:text-white"
            >
              Discard
            </Link>
            <div className="space-x-6">
              <Link
                to="/dashboard/products"
                className="rounded-md border bg-[#f7e8c1] px-4 py-1 text-[#b88e2f] shadow-sm transition-all hover:bg-[#e0c993]"
              >
                Schedule
              </Link>
              <motion.button
                className="rounded-md border bg-[#b88e2f] px-4 py-1 text-white shadow-sm transition-all hover:bg-[#a07d28]"
                type="submit"
                whileTap={{ scale: 0.9 }}
              >
                Add Product
              </motion.button>
            </div>
          </div>
        </div>
      </form>
    </section>
  );
};

export default AddProducts;

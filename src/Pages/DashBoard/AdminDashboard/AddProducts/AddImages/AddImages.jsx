import { LuImage } from "react-icons/lu";
import image1 from "../../../../../assets/images/home/gallery-1.png";
import image2 from "../../../../../assets/images/home/gallery-3.png";
import image3 from "../../../../../assets/images/home/gallery-5.png";
import image4 from "../../../../../assets/images/home/gallery-7.png";
import { BsInfoCircle } from "react-icons/bs";
import { motion } from "framer-motion";

const AddImages = ({ register, errors }) => {
  return (
    <div className="col-span-12 rounded-lg border bg-white px-4 pb-4 pt-6 shadow-sm lg:col-span-4">
      <div className="mb-6">
        <h3 className="flex items-center gap-1 font-semibold">
          Product Images
          <span
            className="group tooltip font-normal"
            data-tip="You need to select at least 5 images."
          >
            <BsInfoCircle
              className={
                errors.images
                  ? "text-red-500"
                  : "text-gray-500 transition-all group-hover:text-black"
              }
            />
          </span>
        </h3>
        {/* Image not selected errors */}
        {errors.images ? (
          <p className="font-regular text-xs text-red-500">
            You need to select at least 5 images*
          </p>
        ) : (
          <p className="font-regular text-xs text-gray-400">
            NOTE: First selected image will be your thumbnail.
          </p>
        )}
      </div>

      <div className="border-2 border-dashed bg-[#f8f9fb] py-10 text-center">
        <LuImage className="inline-block text-3xl text-gray-500" />
        <div className="mt-2 text-xs text-gray-600">
          Drop your image or
          <motion.label
            className="block cursor-pointer font-medium text-blue-400"
            whileTap={{ scale: 0.9 }}
            htmlFor="images"
          >
            click to browse
          </motion.label>
        </div>
        <input
          className="hidden"
          type="file"
          id="images"
          multiple
          {...register("images", { required: true })}
        />
      </div>
      <div className="mt-6 flex w-full flex-wrap items-center justify-center gap-x-1.5 gap-y-2">
        <img
          src={image1}
          alt=""
          className="size-16 object-cover object-center"
        />
        <img
          src={image2}
          alt=""
          className="size-16 object-cover object-center"
        />
        <img
          src={image3}
          alt=""
          className="size-16 object-cover object-center"
        />
        <img
          src={image4}
          alt=""
          className="size-16 object-cover object-center"
        />
        <img
          src={image1}
          alt=""
          className="size-16 object-cover object-center"
        />
      </div>
    </div>
  );
};

export default AddImages;

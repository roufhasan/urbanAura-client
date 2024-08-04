import { motion } from "framer-motion";
import { LuImage } from "react-icons/lu";
import { BsInfoCircle } from "react-icons/bs";

const AddImages = ({
  selectedImages,
  setSelectedImages,
  imagePreviews,
  setImagePreviews,
}) => {
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.slice(0, 5 - selectedImages?.length);

    const updatedImages = [...selectedImages, ...newImages].slice(0, 5);
    setSelectedImages(updatedImages);

    const newPreviews = newImages.map((file) => URL.createObjectURL(file));
    setImagePreviews((prevPreviews) =>
      [...prevPreviews, ...newPreviews].slice(0, 5),
    );
  };

  return (
    <div className="col-span-12 rounded-lg border bg-white px-4 pb-4 pt-6 shadow-sm lg:col-span-4">
      <div className="mb-6">
        <h3 className="flex items-center gap-1 font-semibold">
          Product Images
          <span
            className="group tooltip font-normal"
            data-tip="You need to select at least 5 images."
          >
            <BsInfoCircle className="text-gray-500 transition-all group-hover:text-black" />
          </span>
        </h3>
        <p className="font-regular text-xs text-gray-400">
          NOTE: The first image from the left will be your thumbnail.
        </p>
      </div>

      {/* Image select div */}
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
          multiple
          onChange={handleImageChange}
          className="hidden"
          type="file"
          id="images"
        />
      </div>

      <div className="mt-6 flex w-full flex-wrap items-center gap-x-1.5 gap-y-2">
        {imagePreviews &&
          imagePreviews.map((preview) => (
            <img
              key={Math.random()}
              src={preview}
              alt=""
              className="size-16 object-cover object-center"
            />
          ))}
      </div>
    </div>
  );
};

export default AddImages;

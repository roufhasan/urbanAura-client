import { useContext, useState } from "react";
import { Rating } from "@smastrom/react-rating";
import { AiFillTwitterCircle } from "react-icons/ai";
import { BsFacebook, BsLinkedin } from "react-icons/bs";
import { AuthContext } from "../../../../Providers/AuthProvider";
import { CartContext } from "../../../../Providers/CartProvider";
import LoginModal from "../../../../components/Modals/LoginModal/LoginModal";
import { formatPrice } from "../../../../utils/formatPrice";

const sizes = ["l", "xl", "xs"];
const colors = ["#816dfa", "black", "#b88e2f"];

const ProductOverview = ({ product }) => {
  const { _id, title, price, thumbnail, gallery } = product;
  const { user } = useContext(AuthContext);
  const { handleCartItemSave } = useContext(CartContext);
  const [mainImage, setMainImage] = useState(thumbnail);
  const [size, setSize] = useState("l");
  const [color, setColor] = useState("#816dfa");
  const [quantity, setQuantity] = useState(1);
  const [isOpen, setIsOpen] = useState(false); // login modal state

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  // Add a new item to cart
  const submitCartItem = () => {
    if (!user) {
      return setIsOpen(true);
    }

    const item = {
      user_email: user.email,
      product_id: _id,
      title,
      price: price.discounted ? price.discounted : price.original,
      thumbnail,
      quantity,
      size,
      color,
    };
    // save new item or update quantity of item if item exists in the cart
    handleCartItemSave(item);
  };

  return (
    <>
      <div className="justify-between pb-16 pt-8 md:flex md:gap-6 lg:gap-10 xl:gap-20">
        {/* gallery container */}
        <div className="flex flex-col-reverse gap-8 md:justify-end lg:flex-row lg:gap-x-4">
          {/* thumbnail */}
          <div className="flex justify-evenly lg:flex-col lg:justify-start lg:gap-8">
            {gallery &&
              gallery.length > 0 &&
              gallery.map((image, index) => {
                return (
                  <img
                    key={index}
                    src={image}
                    alt="shop image"
                    onClick={() => setMainImage(image)}
                    onMouseEnter={() => setMainImage(image)}
                    className={`size-16 rounded-[10px] border-[3px] object-cover object-center transition-all duration-150 ease-in sm:size-20 md:h-20 md:w-[76px] ${image === mainImage ? "border-[#b88e2f]" : "border-transparent"}`}
                  ></img>
                );
              })}
          </div>
          {/* main image */}
          <div>
            <img
              src={mainImage}
              alt={`image of ${title}`}
              className="h-96 w-full rounded-[10px] object-cover object-center sm:h-[450px] md:h-[500px] md:max-h-[500px] md:w-[420px] md:max-w-[420px]"
            />
          </div>
        </div>

        {/* product info container */}
        <div className="mt-8 flex-1">
          <h1 className="text-2xl font-semibold sm:text-3xl lg:text-4xl lg:font-normal xl:text-[42px]">
            {title}
          </h1>
          <p className="mt-4 text-xl font-medium text-[#9f9f9f] sm:text-2xl">
            ${" "}
            {price.discounted
              ? formatPrice(price.discounted)
              : formatPrice(price.original)}
          </p>
          <div className="mb-4 mt-3 flex flex-wrap items-center gap-2 lg:gap-5">
            <Rating style={{ maxWidth: 110 }} value={3.5} readOnly />
            <div className="h-6 w-0.5 bg-[#9f9f9f] lg:h-8"></div>
            <p className="text-sm text-[#9f9f9f]">5 customer review</p>
          </div>

          <p className="mb-6 w-full max-w-md text-sm">
            Setting the bar as one of the loudest speakers in its class, the
            Kilburn is a compact, stout-hearted hero with a well-balanced audio
            which boasts a clear midrange and extended highs for a sound.
          </p>
          {/* Size Selection Buttons */}
          <div className="text-sm">
            <p className="text-[#9f9f9f]">Size</p>
            <div className="mt-3 flex gap-4">
              {sizes.map((itemSize, i) => (
                <button
                  onClick={() => setSize(itemSize)}
                  key={i}
                  className={`size-8 rounded-md uppercase ${size === itemSize ? "bg-[#b88e2f] text-white" : "bg-[#f9f1e7]"}`}
                >
                  {itemSize}
                </button>
              ))}
            </div>
          </div>
          {/* Color Selection Buttons */}
          <div className="mt-5 text-sm">
            <p className="text-[#9f9f9f]">Color</p>
            <div className="mt-3 flex gap-4">
              {colors.map((itemColor, i) => (
                <div
                  key={i}
                  onClick={() => setColor(itemColor)}
                  className={`size-8 cursor-pointer rounded-full ${itemColor === color && "border-4 bg-slate-900"}`}
                  style={{ backgroundColor: itemColor }}
                ></div>
              ))}
            </div>
          </div>

          {/* buttons */}
          <div className="mb-16 mt-8 flex flex-col flex-wrap gap-4 lg:flex-row">
            {/* Quantity selection button */}
            <div className="inline-flex w-full flex-1 items-center justify-center gap-2 rounded-[10px] border border-[#9f9f9f] p-2 lg:w-1/2 lg:p-3 xl:max-w-[120px] xl:p-5">
              <button
                onClick={decreaseQuantity}
                className="flex size-5 items-center justify-center rounded-full transition-all hover:bg-gray-300"
              >
                -
              </button>
              <p>{quantity}</p>
              <button
                onClick={increaseQuantity}
                className="flex size-5 items-center justify-center rounded-full transition-all hover:bg-gray-300"
              >
                +
              </button>
            </div>
            {/* Add to cart button */}
            <button
              onClick={submitCartItem}
              className="flex flex-1 items-center justify-center rounded-[10px] border border-black py-2 md:w-full md:px-12 lg:w-1/2 lg:px-6 lg:text-lg xl:max-w-[217px] xl:px-2 xl:text-xl"
            >
              Add To Cart
            </button>
            {/* Compare button */}
            <button className="flex items-center justify-center gap-2.5 rounded-[10px] border border-black py-2 md:w-full md:px-12 xl:max-w-[215px] xl:py-[14px]">
              <span className="lg:text-lg xl:text-xl">+ Compare</span>
            </button>
          </div>

          <div className="border-t border-[#d9d9d9] pt-10">
            <div className="grid gap-3 text-[#9f9f9f]">
              <div className="grid grid-cols-[90px_34px_auto]">
                <span>SKU</span>
                <span className="text-center">:</span>
                <span>SS001</span>
              </div>
              <div className="grid grid-cols-[90px_34px_auto]">
                <span>Category</span>
                <span className="text-center">:</span>
                <span>Sofas</span>
              </div>
              <div className="grid grid-cols-[90px_34px_auto]">
                <span>Tags</span>
                <span className="text-center">:</span>
                <span>Sofa, Chair, Home, Shop</span>
              </div>
              <div className="grid grid-cols-[90px_34px_auto]">
                <span>Share</span>
                <span className="text-center">:</span>
                <span className="flex items-center gap-6">
                  <a href="#" className="text-black">
                    <BsFacebook size={20} />
                  </a>
                  <a href="#" className="text-black">
                    <BsLinkedin size={20} />
                  </a>
                  <a href="#" className="text-black">
                    <AiFillTwitterCircle size={25} />
                  </a>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Login Modal if user not available */}
      {isOpen && !user && <LoginModal isOpen={isOpen} setIsOpen={setIsOpen} />}
    </>
  );
};

export default ProductOverview;

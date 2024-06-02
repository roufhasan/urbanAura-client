import { useContext, useState } from "react";
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
  const [isOpen, setIsOpen] = useState(false); // login modal state\

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
    // save/update quantity of cart item if exists in the db
    handleCartItemSave(item);
  };

  return (
    <>
      <div className="justify-between pb-16 pt-8 md:flex md:gap-24">
        {/* gallery container */}
        <div className="flex flex-col-reverse gap-8 md:flex-row">
          {/* thumbnail */}
          <div className="flex justify-evenly md:flex-col md:justify-start md:gap-8">
            {gallery &&
              gallery.length > 0 &&
              gallery.map((image, index) => {
                return (
                  <img
                    key={index}
                    src={image}
                    alt="shop image"
                    onMouseEnter={() => setMainImage(image)}
                    className={`size-16 rounded-[10px] border-[3px] object-cover object-center transition-all duration-150 ease-in md:h-20 md:w-[76px] ${image === mainImage ? "border-[#b88e2f]" : "border-transparent"}`}
                  ></img>
                );
              })}
          </div>
          {/* main image */}
          <div>
            <img
              src={mainImage}
              alt=""
              className="h-[450px] w-full rounded-[10px] object-cover object-center md:h-[500px] md:max-h-[500px] md:w-[420px] md:max-w-[420px]"
            />
          </div>
        </div>

        {/* product info container */}
        <div className="mt-8 flex-1">
          <h1 className="text-[42px]">{title}</h1>
          <p className="text-2xl font-medium text-[#9f9f9f]">
            ${" "}
            {price.discounted
              ? formatPrice(price.discounted)
              : formatPrice(price.original)}
          </p>
          <div className="mb-4 mt-3 flex flex-wrap items-center gap-5">
            <p>⭐⭐⭐⭐⭐</p>
            <div className="h-8 w-0.5 bg-[#9f9f9f]"></div>
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
          <div className="mb-16 mt-8 flex flex-col gap-4 md:flex-row">
            <div className="inline-flex w-full items-center justify-center gap-2 rounded-[10px] border border-[#9f9f9f] p-4 md:max-w-[120px] md:p-5">
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
            <button
              onClick={submitCartItem}
              className="flex flex-1 justify-center rounded-[10px] border border-black py-4 text-xl md:w-full md:max-w-[217px] md:px-12"
            >
              Add To Cart
            </button>
            <button className="flex justify-center gap-2.5 rounded-[10px] border border-black py-[14px] text-2xl md:w-full md:max-w-[215px] md:px-12">
              + <span className="text-xl">Compare</span>
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

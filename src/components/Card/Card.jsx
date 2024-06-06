import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { BsArrowLeftRight, BsFillShareFill, BsHeart } from "react-icons/bs";
import { AuthContext } from "../../Providers/AuthProvider";
import LoginModal from "../Modals/LoginModal/LoginModal";
import AddToCartModal from "../Modals/AddToCartModal.jsx/AddToCartModal";
import { formatPrice } from "../../utils/formatPrice";

const Card = ({ product }) => {
  const { _id, title, sub_title, price, thumbnail, is_new } = product;
  const { user } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState({});

  const handleModal = () => {
    if (!user) {
      return setIsOpen(true);
    }
    setIsOpen(true);
    setSelectedProduct(product);
  };

  return (
    <>
      <div className="group relative">
        <div className="relative h-[300px] w-full">
          <Link to={`/products/${_id}`}>
            <img
              className="h-full w-full object-cover object-center"
              src={thumbnail}
              alt={`image of ${title}`}
              loading="lazy"
            />
          </Link>
          {price.discount_percent || is_new ? (
            <p
              className={`text-white" absolute right-4 top-4 flex size-11 items-center justify-center rounded-full font-medium text-white md:right-6 md:top-6 md:size-12 ${is_new ? "bg-[#2EC1AC]" : "bg-[#E97171]"}`}
            >
              <span>{is_new ? "New" : `-${price.discount_percent}%`}</span>
            </p>
          ) : null}
        </div>

        <div className="bg-[#F4F5F7] pb-7 pl-4 pr-5 pt-4">
          <Link
            to={`/products/${_id}`}
            className="text-xl font-semibold md:text-2xl"
          >
            {title}
          </Link>
          <p className="my-2 text-[#898989] md:font-medium">{sub_title}</p>

          <div
            className={`${price.discounted && "flex items-center justify-between"}`}
          >
            {price.discounted ? (
              <p className="text-lg font-semibold md:text-xl">
                ${formatPrice(price.discounted)}
              </p>
            ) : (
              <p className="text-lg font-semibold md:text-xl">
                ${formatPrice(price.original)}
              </p>
            )}

            {/* Original price of a discounted product  */}
            {price.discounted && (
              <p className="text-[#B0B0B0] line-through">
                ${formatPrice(price.original)}
              </p>
            )}
          </div>
        </div>

        {/* Hover Elements */}
        <Link
          to={`/products/${_id}`}
          className="absolute bottom-0 left-0 h-0 w-full bg-[#3A3A3A] opacity-0 transition-all duration-300 ease-linear group-hover:z-10 group-hover:h-full group-hover:opacity-70"
        ></Link>
        <div className="absolute left-0 top-0 hidden h-full w-full flex-col items-center justify-center gap-6 px-4 group-hover:flex">
          <button
            onClick={() => handleModal(product)}
            className="z-20 bg-white px-14 py-3 font-medium text-[#B88E2F]"
          >
            Add to cart
          </button>
          <div className="z-20 flex flex-wrap items-center justify-between gap-4 font-semibold text-white">
            <button className="flex items-center gap-1">
              <BsFillShareFill size={14} /> Share
            </button>
            <button className="flex items-center gap-1">
              <BsArrowLeftRight /> Compare
            </button>
            <button className="flex items-center gap-1">
              <BsHeart /> Like
            </button>
          </div>
        </div>
      </div>

      {isOpen && user ? (
        <AddToCartModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          selectedProduct={selectedProduct}
        />
      ) : (
        <LoginModal isOpen={isOpen} setIsOpen={setIsOpen} />
      )}
    </>
  );
};

export default Card;

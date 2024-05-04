import { BsArrowLeftRight, BsFillShareFill, BsHeart } from "react-icons/bs";
import { Link } from "react-router-dom";

const Card = ({ product }) => {
  const { id, title, sub_title, price, image, isNew, discount } = product;

  const discountedPrice = (orginalPrice, discountPercentage) => {
    const offerPrice = orginalPrice - (orginalPrice * discountPercentage) / 100;

    if (Math.floor(offerPrice) !== offerPrice) {
      return offerPrice.toFixed(2);
    }
    return offerPrice;
  };

  return (
    <div className="group relative">
      <div className="relative h-[300px] w-full">
        <img
          className="h-full w-full object-cover object-center"
          src={image}
          alt={`image of ${title}`}
          loading="lazy"
        />
        {isNew || discount > 0 ? (
          <p
            className={`text-white" absolute right-4 top-4 flex size-11 items-center justify-center rounded-full font-medium text-white md:right-6 md:top-6 md:size-12 ${isNew ? "bg-[#2EC1AC]" : "bg-[#E97171]"}`}
          >
            <span>{isNew ? "New" : `-${discount}%`}</span>
          </p>
        ) : null}
      </div>

      <div className="bg-[#F4F5F7] pb-7 pl-4 pr-5 pt-4">
        <h3 className="text-xl font-semibold md:text-2xl">{title}</h3>
        <p className="my-2 text-[#898989] md:font-medium">{sub_title}</p>

        <div
          className={`${price && discount > 0 && "flex items-center justify-between"}`}
        >
          {price && discount ? (
            <p className="text-lg font-semibold md:text-xl">
              ${discountedPrice(price, discount)}
            </p>
          ) : (
            <p className="text-lg font-semibold md:text-xl">${price}</p>
          )}

          {/* Original price of a discounted product  */}
          {price && discount > 0 && (
            <p className="text-[#B0B0B0] line-through">${price.toFixed(2)}</p>
          )}
        </div>
      </div>

      {/* Hover Elements */}
      <Link
        to={`/products/${id}`}
        className="absolute bottom-0 left-0 h-0 w-full bg-[#3A3A3A] opacity-0 transition-all duration-300 ease-linear group-hover:z-10 group-hover:h-full group-hover:opacity-70"
      ></Link>
      <div className="absolute left-0 top-0 hidden h-full w-full flex-col items-center justify-center gap-6 px-4 group-hover:flex">
        <button className="z-20 bg-white px-14 py-3 font-medium text-[#B88E2F]">
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
  );
};

export default Card;

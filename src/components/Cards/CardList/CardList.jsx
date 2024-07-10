import { Link } from "react-router-dom";
import { formatPrice } from "../../../utils/formatPrice";
// import { discountedPrice } from "../../utils/discountedPrice";

const CardList = ({ product }) => {
  const { _id, title, sub_title, price, thumbnail, is_new } = product;

  return (
    <div className="flex bg-[#faf3ea] shadow-sm">
      {/* image and product status */}
      <div className="relative h-40 w-40 md:h-44 xl:h-48">
        <Link to={`/products/${_id}`}>
          <img
            className="h-full w-full object-cover object-center"
            src={thumbnail}
            alt={`image of ${title}`}
            loading="lazy"
          />
        </Link>
        {is_new || price.discount_percent ? (
          <p
            className={`absolute right-4 top-4 flex size-8 items-center justify-center rounded-full text-xs font-medium text-white md:right-3 md:top-3 md:size-9 ${is_new ? "bg-[#2EC1AC]" : "bg-[#E97171]"}`}
          >
            <span>{is_new ? "New" : `-${price.discount_percent}%`}</span>
          </p>
        ) : null}
      </div>

      {/* product info */}
      <div className="w-full px-6 py-4">
        <div className="flex items-center justify-between">
          <Link
            to={`/products/${_id}`}
            className="text-xl font-semibold md:text-2xl"
          >
            {title}
          </Link>
          {/* Original price of a discounted product  */}
          {price.discounted && (
            <p className="text-[#B0B0B0] line-through">
              ${formatPrice(price.original)}
            </p>
          )}
        </div>

        <div className="mt-3 flex items-center justify-between gap-2 md:mt-4">
          <p className="text-[#898989] md:font-medium">{sub_title}</p>
          {/* discounted price */}
          <div
            className={`${price.discounted && "flex items-center justify-between"} mt-auto`}
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardList;

import { Link } from "react-router-dom";
import { BsCartCheck, BsCartPlus } from "react-icons/bs";
import { BiSolidTrashAlt } from "react-icons/bi";
import { formatPrice } from "../../../../utils/formatPrice";

const FavouriteItemList = ({
  item,
  deleteFavouriteItem,
  cartItemIds,
  handleCartItemSave,
  user,
}) => {
  return (
    <div className="flex w-full flex-col justify-between md:flex-row">
      <div className="flex w-full gap-x-6">
        <img
          className="h-16 w-14 min-w-16 rounded-[10px] object-cover object-center"
          src={item.thumbnail}
          alt={`image of ${item.title}`}
          loading="lazy"
        />
        <div className="w-full space-y-4 md:w-fit">
          <Link
            to={`/products/${item.product_id}`}
            className="text-lg font-medium"
          >
            {item.title}
          </Link>
          <div className="space-y-1 md:hidden">
            <p>
              $
              {item.price.discounted
                ? formatPrice(item.price.discounted)
                : formatPrice(item.price.original)}
            </p>
            {item.price.discount_percent && (
              <>
                <div className="flex items-center gap-2 text-sm">
                  <del className="text-cadetGray">
                    ${formatPrice(item.price.original)}
                  </del>
                  <p>-{item.price.discount_percent}%</p>
                </div>
                <p className="text-sm text-green-600">Price dropped</p>
              </>
            )}
          </div>
          <div className="flex w-full justify-between">
            <button>
              <BiSolidTrashAlt
                onClick={() => deleteFavouriteItem(item.product_id, user.email)}
                className="text-cadetGray cursor-pointer text-xl transition-all hover:text-primary"
              />
            </button>
            {cartItemIds.includes(item.product_id) ? (
              <button
                disabled
                className="bg-green-600 px-8 py-2 text-2xl text-white md:hidden"
              >
                <BsCartCheck />
              </button>
            ) : (
              <button
                onClick={() =>
                  handleCartItemSave({
                    user_email: user.email,
                    product_id: item.product_id,
                    title: item.title,
                    price: item.price.discounted
                      ? item.price.discounted
                      : item.price.original,
                    thumbnail: item.thumbnail,
                    quantity: item.quantity,
                    size: item.size,
                    color: item.color,
                  })
                }
                className="bg-primary px-8 py-2 text-2xl text-white md:hidden"
              >
                <BsCartPlus />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* medium device price and add to cart button */}
      <div className="hidden w-full justify-between md:flex">
        <div className="space-y-1">
          <p>
            $
            {item.price.discounted
              ? formatPrice(item.price.discounted)
              : formatPrice(item.price.original)}
          </p>
          {item.price.discount_percent && (
            <>
              <div className="flex items-center gap-2 text-sm">
                <del className="text-cadetGray">
                  ${formatPrice(item.price.original)}
                </del>
                <p>-{item.price.discount_percent}%</p>
              </div>
              <p className="text-sm text-green-600">Price dropped</p>
            </>
          )}
        </div>
        <div>
          {cartItemIds.includes(item.product_id) ? (
            <button
              disabled
              className="bg-green-600 px-8 py-2 text-2xl text-white"
            >
              <BsCartCheck />
            </button>
          ) : (
            <button
              onClick={() =>
                handleCartItemSave({
                  user_email: user.email,
                  product_id: item.product_id,
                  title: item.title,
                  price: item.price.discounted
                    ? item.price.discounted
                    : item.price.original,
                  thumbnail: item.thumbnail,
                  quantity: item.quantity,
                  size: item.size,
                  color: item.color,
                })
              }
              className="bg-primary px-8 py-2 text-2xl text-white"
            >
              <BsCartPlus />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FavouriteItemList;

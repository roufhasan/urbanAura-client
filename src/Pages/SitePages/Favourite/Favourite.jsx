import { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { BsCartCheck, BsCartPlus } from "react-icons/bs";
import { BiSolidTrashAlt } from "react-icons/bi";
import { AuthContext } from "../../../Providers/AuthProvider";
import PageBanner from "../../../components/PageBanner/PageBanner";
import { formatPrice } from "../../../utils/formatPrice";
import { CartContext } from "../../../Providers/CartProvider";

const Favourite = () => {
  const { pathname } = useLocation();
  const { user } = useContext(AuthContext);
  const { cart, handleCartItemSave } = useContext(CartContext);
  const [favouriteItems, setFavouriteItems] = useState([]);

  // Get favourite items of a user
  const getFavouriteItems = (email) => {
    axios
      .get("http://localhost:5000/favourite", {
        params: { userEmail: email },
      })
      .then((res) => setFavouriteItems(res.data))
      .catch((err) => {
        console.error(
          "error while fetching favourite items:",
          err.response.data.message,
        );
      });
  };

  useEffect(() => {
    if (user && user.email) {
      getFavouriteItems(user.email);
    }
  }, [user]);

  const cartItemIds = cart.map((item) => item.product_id);

  return (
    <section>
      <PageBanner pathname={pathname} />
      {/* Favourite Items List */}
      <div className="px-[4%] py-[72px] md:px-[7%]">
        <p className="mb-10 border-b pb-2">Favourite Items</p>
        {/* favourite list container */}
        <div className="space-y-8">
          {favouriteItems &&
            favouriteItems.length > 0 &&
            favouriteItems.map((item) => (
              <div
                key={item._id}
                className="flex w-full flex-col justify-between md:flex-row"
              >
                <div className="flex w-full gap-x-6">
                  <img
                    src={item.thumbnail}
                    alt=""
                    className="h-16 w-14 min-w-16 rounded-[10px] object-cover object-center"
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
                            <del className="text-[#9f9f9f]">
                              ${formatPrice(item.price.original)}
                            </del>
                            <p>-{item.price.discount_percent}%</p>
                          </div>
                          <p className="text-sm text-green-600">
                            Price dropped
                          </p>
                        </>
                      )}
                    </div>
                    <div className="flex w-full justify-between">
                      <button>
                        <BiSolidTrashAlt className="cursor-pointer text-xl text-[#9f9f9f] transition-all hover:text-[#b88e2f]" />
                      </button>
                      {cartItemIds.includes(item.product_id) ? (
                        <button className="bg-green-600 px-8 py-2 text-2xl text-white md:hidden">
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
                          className="bg-[#b88e2f] px-8 py-2 text-2xl text-white md:hidden"
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
                          <del className="text-[#9f9f9f]">
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
                      <button className="bg-green-600 px-8 py-2 text-2xl text-white">
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
                        className="bg-[#b88e2f] px-8 py-2 text-2xl text-white"
                      >
                        <BsCartPlus />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Favourite;

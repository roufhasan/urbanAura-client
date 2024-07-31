import { Link } from "react-router-dom";
import { BiSolidTrashAlt } from "react-icons/bi";
import { motion } from "framer-motion";
import FixedLoader from "../../../../components/Loaders/Loader/FixedLoader";
import { calculateTotalPrice } from "../../../../utils/calculateTotalPrice";
import { formatPrice } from "../../../../utils/formatPrice";
import "./cartDetails.css";
import useCart from "../../../../hooks/useCart";

const CartDetails = () => {
  const { cart, cartLoading, handleQuantity, handleCartItemDel } = useCart();
  // total price of all cart items
  const totalPrice = calculateTotalPrice(cart);

  const increaseQuantity = (quantity, product_id) => {
    handleQuantity(quantity + 1, product_id);
  };

  const decreaseQuantity = (quantity, product_id) => {
    if (quantity > 1) {
      handleQuantity(quantity - 1, product_id);
    }
  };

  return (
    <>
      <div className="px-[4%] py-[72px] md:px-[7%] lg:flex lg:gap-8">
        {cart && cart.length > 0 ? (
          <>
            <div className="w-full lg:flex-1">
              {/* products info table */}
              <div className="overflow-x-auto">
                <table className="table">
                  {/* head */}
                  <thead className="bg-[#f9f1e7]">
                    <tr className="text-left text-base font-medium text-black">
                      <th></th>
                      <th className="py-4">Product</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Subtotal</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart &&
                      cart.length > 0 &&
                      cart.map((item) => (
                        <tr
                          key={item._id}
                          className="text-base shadow-sm transition-all hover:bg-gray-100"
                        >
                          <td>
                            <motion.button whileTap={{ scale: 0.9 }}>
                              <Link to={`/products/${item.product_id}`}>
                                <img
                                  className="h-16 w-14 min-w-16 rounded-[10px] object-cover object-center md:size-[105px]"
                                  src={item.thumbnail}
                                  alt={item.title}
                                  loading="lazy"
                                />
                              </Link>
                            </motion.button>
                          </td>
                          <td>
                            <motion.p
                              whileTap={{ scale: 0.9 }}
                              className="text-[#9f9f9f]"
                            >
                              <Link to={`/products/${item.product_id}`}>
                                {item.title}
                              </Link>
                            </motion.p>
                          </td>
                          <td>
                            <p className="text-[#9f9f9f]">${item.price}</p>
                          </td>
                          <td>
                            <div className="flex items-center gap-3">
                              <button
                                disabled={cartLoading}
                                onClick={() =>
                                  decreaseQuantity(
                                    item.quantity,
                                    item.product_id,
                                  )
                                }
                                className="flex size-5 items-center justify-center rounded-full transition-all hover:bg-gray-300"
                              >
                                -
                              </button>
                              <p>{item.quantity}</p>
                              <button
                                disabled={cartLoading}
                                onClick={() =>
                                  increaseQuantity(
                                    item.quantity,
                                    item.product_id,
                                  )
                                }
                                className="flex size-5 items-center justify-center rounded-full transition-all hover:bg-gray-300"
                              >
                                +
                              </button>
                            </div>
                          </td>
                          <td>
                            <p>${formatPrice(item.quantity * item.price)}</p>
                          </td>
                          <td>
                            <BiSolidTrashAlt
                              onClick={() => handleCartItemDel(item._id)}
                              size={26}
                              className="cursor-pointer text-[#b88e2f] transition-all hover:text-[#947325]"
                            />
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mt-16 h-fit bg-[#f9f1e7] px-10 pb-10 pt-4 text-right md:px-16 lg:mt-0 lg:inline-block lg:pb-20 lg:text-left">
              <h2 className="mb-8 text-2xl font-semibold lg:mb-14 lg:text-[32px]">
                Cart Totals
              </h2>
              <p className="mb-2 md:mb-8">
                <span className="mr-16 font-medium">Subtotal</span>
                <span className="text-[#9f9f9f]">
                  ${formatPrice(totalPrice)}
                </span>
              </p>
              <p className="mb-8 md:mb-10">
                <span className="mr-14 font-medium">Total</span>
                <span className="text-xl font-medium text-[#b88e2f]">
                  ${formatPrice(totalPrice)}
                </span>
              </p>
              <motion.button whileTap={{ scale: 0.9 }}>
                <Link
                  to="/checkout"
                  className="inline-block rounded-2xl border border-black px-6 py-3 text-lg transition-all hover:border-[#b88e2f] hover:bg-[#b88e2f] hover:text-white md:py-4 lg:px-9 lg:text-xl xl:px-12"
                >
                  Check Out
                </Link>
              </motion.button>
            </div>
          </>
        ) : (
          <div className="w-full text-center">
            <h1 className="mb-2 text-2xl font-medium">
              You have not added any items to the cart.
            </h1>
            <div className="text-[#9f9f9f]">
              <Link to="/shop" className="text-[#b88e2f]">
                Browse our catalog
              </Link>{" "}
              and add your desired items to see them here.
            </div>
          </div>
        )}
      </div>
      {cartLoading && <FixedLoader />}
    </>
  );
};

export default CartDetails;

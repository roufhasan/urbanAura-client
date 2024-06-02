import { useContext } from "react";
import { Link } from "react-router-dom";
import { BiSolidTrashAlt } from "react-icons/bi";
import { CartContext } from "../../../../Providers/CartProvider";
import { formatPrice } from "../../../../utils/formatPrice";
import "./cartDetails.css";
import { calculateTotalPrice } from "../../../../utils/calculateTotalPrice";

const CartDetails = () => {
  const { cart, handleCartItemDel } = useContext(CartContext);

  // total price of all cart items
  const totalPrice = calculateTotalPrice(cart);

  // const increaseQuantity = () => {
  //   setQuantity(quantity + 1);
  // };

  // const decreaseQuantity = () => {
  //   if (quantity > 1) {
  //     setQuantity(quantity - 1);
  //   }
  // };

  return (
    <div className="px-[4%] py-[72px] md:px-[7%] lg:flex lg:gap-8">
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
                      <img
                        src={item.thumbnail}
                        alt=""
                        className="h-16 w-14 min-w-16 rounded-[10px] object-cover object-center md:size-[105px]"
                      />
                    </td>
                    <td>
                      <p className="text-[#9f9f9f]">{item.title}</p>
                    </td>
                    <td>
                      <p className="text-[#9f9f9f]">${item.price}</p>
                    </td>
                    <td>
                      <div className="flex items-center gap-3">
                        <button
                          // onClick={decreaseQuantity}
                          className="flex size-5 items-center justify-center rounded-full transition-all hover:bg-gray-300"
                        >
                          -
                        </button>
                        <p>{item.quantity}</p>
                        <button
                          // onClick={increaseQuantity}
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
                        className="cursor-pointer text-[#b88e2f]"
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
          <span className="text-[#9f9f9f]">${formatPrice(totalPrice)}</span>
        </p>
        <p className="mb-8 md:mb-10">
          <span className="mr-14 font-medium">Total</span>
          <span className="text-xl font-medium text-[#b88e2f]">
            ${formatPrice(totalPrice)}
          </span>
        </p>
        <Link
          to="/checkout"
          className="inline-block rounded-2xl border border-black px-6 py-3 text-lg md:py-4 lg:px-9 lg:text-xl xl:px-12"
        >
          Check Out
        </Link>
      </div>
    </div>
  );
};

export default CartDetails;

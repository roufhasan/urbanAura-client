import { useState } from "react";
import { Link } from "react-router-dom";
import { BiSolidTrashAlt } from "react-icons/bi";
import img from "../../../../assets/images/home/gallery-9.png";
import "./cartDetails.css";

const CartDetails = () => {
  const [quantity, setQuantity] = useState(1);

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="px-[4%] py-[72px] md:flex md:gap-8 md:px-[7%]">
      <div className="w-full md:flex-1">
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
              <tr className="text-base">
                <td>
                  <img
                    src={img}
                    alt=""
                    className="h-16 w-14 min-w-16 rounded-[10px] object-cover object-center md:size-[105px]"
                  />
                </td>
                <td>
                  <p className="text-[#9f9f9f]">Asgaard sofa</p>
                </td>
                <td>
                  {/* original price */}
                  <p className="text-[#9f9f9f]">$100</p>
                </td>
                <td>
                  <div className="flex items-center gap-3">
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
                </td>
                <td>
                  <p>${quantity * 100}</p>
                </td>
                <td>
                  <BiSolidTrashAlt
                    size={26}
                    className="cursor-pointer text-[#b88e2f]"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="inline-block bg-[#f9f1e7] px-16 pb-20 pt-4">
        <h2 className="mb-14 text-[32px] font-semibold">Cart Totals</h2>
        <p className="mb-8">
          <span className="mr-16 font-medium">Subtotal</span>
          <span className="text-[#9f9f9f]">$200</span>
        </p>
        <p className="mb-10">
          <span className="mr-14 font-medium">Total</span>
          <span className="text-xl font-medium text-[#b88e2f]">$200</span>
        </p>
        <Link
          to="/checkout"
          className="inline-block rounded-2xl border border-black px-14 py-4 text-xl"
        >
          Check Out
        </Link>
      </div>
    </div>
  );
};

export default CartDetails;

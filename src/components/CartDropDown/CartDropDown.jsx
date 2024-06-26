import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Dialog, DialogPanel, Transition } from "@headlessui/react";
import { BsBagX, BsCart3 } from "react-icons/bs";
import { IoCloseCircle } from "react-icons/io5";
import { CartContext } from "../../Providers/CartProvider";
import { formatPrice } from "../../utils/formatPrice";
import { calculateTotalPrice } from "../../utils/calculateTotalPrice";

const CartDropDown = ({ user }) => {
  const { cart, handleCartItemDel } = useContext(CartContext);
  const [isOpen, setIsOpen] = useState(false);
  const [isShowing, setIsShowing] = useState(true);

  // subtoatl price of all carted items
  const totalPrice = calculateTotalPrice(cart);

  return (
    <>
      <div className="relative">
        {user ? (
          <>
            <BsCart3
              onClick={() => {
                setIsOpen(true);
                setIsShowing(false);
                setTimeout(() => setIsShowing(true), 300);
              }}
              className="cursor-pointer text-2xl lg:text-[23px]"
            />
            {cart && cart.length > 0 && (
              <p className="absolute -right-1 -top-1 flex size-[14px] items-center justify-center rounded-full bg-red-500 text-xs text-white">
                {cart.length}
              </p>
            )}
          </>
        ) : (
          <Link to="/login">
            <BsCart3 className="cursor-pointer text-2xl lg:text-[23px]" />
          </Link>
        )}
      </div>

      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50 font-Poppins"
      >
        <div className="fixed inset-0 mx-auto flex w-full max-w-[1920px] items-start justify-end bg-black/20">
          <Transition
            show={isShowing}
            enter="transition ease-in-out duration-300"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <DialogPanel className="flex h-screen max-h-[1080px] min-h-fit w-full max-w-[417px] flex-col justify-between overflow-y-auto bg-white py-5">
              {/* products div */}
              <div className="pl-[30px] pr-10">
                {/* title */}
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-semibold">Shopping Cart</h2>
                  <BsBagX
                    size={19}
                    onClick={() => setIsOpen(false)}
                    className="cursor-pointer text-[#9f9f9f] transition-all hover:text-[#8f8f8f]"
                  />
                </div>
                <div className="mb-10 mt-6 h-[1px] w-5/6 bg-[#d9d9d9]"></div>
                {/* Products container */}
                <div className="h-[60vh] max-h-[648px] space-y-5 overflow-y-auto">
                  {cart &&
                    cart.length > 0 &&
                    cart.map((item) => (
                      <div
                        key={item._id}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center gap-8">
                          <img
                            loading="lazy"
                            src={item.thumbnail}
                            alt={`${item.title} image`}
                            className="size-24 rounded-[10px] object-cover object-center"
                          />
                          <div>
                            <p>{item.title}</p>
                            <p className="mt-2 font-light">
                              {item.quantity}
                              <span className="mx-4 text-xs">X</span>
                              <span className="text-xs font-medium text-[#b88e2f]">
                                ${formatPrice(item.price * item.quantity)}
                              </span>
                            </p>
                          </div>
                        </div>
                        <IoCloseCircle
                          onClick={() => handleCartItemDel(item._id)}
                          size={24}
                          className="cursor-pointer text-[#9f9f9f] transition-all hover:text-[#888888]"
                        />
                      </div>
                    ))}
                </div>
              </div>

              <div>
                <div className="mt-7 flex items-center justify-between pl-[30px] pr-24">
                  <p>Subtotal</p>
                  <p className="font-semibold text-[#b88e2f]">
                    ${formatPrice(totalPrice)}
                  </p>
                </div>
                <div className="my-6 h-[1px] bg-[#d9d9d9]"></div>
                {/* buttons */}
                <div className="flex w-full justify-between gap-5 px-7 pb-7">
                  <Link
                    onClick={() => setIsOpen(false)}
                    to="/cart"
                    className="w-full rounded-full border border-black px-[30px] py-1.5 text-center text-xs"
                  >
                    Cart
                  </Link>
                  <Link
                    to="/checkout"
                    className="w-full rounded-full border border-black px-[30px] py-1.5 text-center text-xs"
                  >
                    Checkout
                  </Link>
                </div>
              </div>
            </DialogPanel>
          </Transition>
        </div>
      </Dialog>
    </>
  );
};

export default CartDropDown;

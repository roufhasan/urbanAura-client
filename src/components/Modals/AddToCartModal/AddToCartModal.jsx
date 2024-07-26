import { useContext, useState } from "react";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { BsXLg } from "react-icons/bs";
import { AuthContext } from "../../../Providers/AuthProvider";
import { CartContext } from "../../../Providers/CartProvider";

const sizes = ["l", "xl", "xs"];
const colors = ["#816dfa", "black", "#b88e2f"];

const AddToCartModal = ({ isOpen, setIsOpen, selectedProduct }) => {
  const { _id, title, thumbnail, price } = selectedProduct;
  const { user } = useContext(AuthContext);
  const { handleCartItemSave } = useContext(CartContext);

  const [size, setSize] = useState("l");
  const [color, setColor] = useState("#816dfa");
  const [quantity, setQuantity] = useState(1);

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

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

  return (
    <Transition appear show={isOpen}>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50 font-Poppins"
      >
        <div className="fixed inset-0 flex h-full w-screen items-center justify-center overflow-y-auto bg-black/50">
          <TransitionChild
            enter="ease-out duration-300"
            enterFrom="opacity-0 transform-[scale(95%)]"
            enterTo="opacity-100 transform-[scale(100%)]"
            leave="ease-in duration-300"
            leaveFrom="opacity-100 transform-[scale(100%)]"
            leaveTo="opacity-0 transform-[scale(95%)]"
          >
            <DialogPanel className="w-full rounded-[10px] border bg-white p-2 md:h-fit md:w-fit md:p-6">
              <div className="flex w-full flex-wrap items-center justify-center gap-4">
                <img
                  className="w-56 rounded-[10px]"
                  src={thumbnail}
                  alt={`${title} image`}
                  loading="lazy"
                />
                {/* Product Info & Add To cart */}
                <div className="space-y-8">
                  <DialogTitle className="flex flex-wrap items-center justify-between text-xl font-medium">
                    {title}
                    <BsXLg
                      onClick={() => setIsOpen(false)}
                      size={24}
                      className="cursor-pointer text-[#9f9f9f] transition-all hover:text-[#8f8f8f]"
                    />
                  </DialogTitle>
                  {/* Size Selection Buttons */}
                  <div className="mt-5 text-sm">
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
                          className={`size-8 rounded-full ${itemColor === color && "border-4 bg-slate-900"}`}
                          style={{ backgroundColor: itemColor }}
                        ></div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-5 flex items-center gap-4">
                    {/* Quantity Increase/Decrease */}
                    <div className="inline-flex w-full max-w-[80px] items-center gap-2 rounded-[10px] border border-black p-2">
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
                    {/* Add To Cart */}
                    <button
                      onClick={() => handleCartItemSave(item, setIsOpen)}
                      className="inline-flex min-w-32 justify-center rounded-[10px] border border-black p-2"
                    >
                      Add To Cart
                    </button>
                  </div>
                </div>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  );
};

export default AddToCartModal;

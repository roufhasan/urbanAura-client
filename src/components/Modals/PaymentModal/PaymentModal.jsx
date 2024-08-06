import { useEffect, useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { BsXLg } from "react-icons/bs";
import toast from "react-hot-toast";
import useCart from "../../../hooks/useCart";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { formatPrice } from "../../../utils/formatPrice";

const PaymentModal = ({
  isOpen,
  setIsOpen,
  user,
  totalPrice,
  billingData,
  triggerFormSubmit,
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const { cart, setCart } = useCart();
  const { axiosSecure } = useAxiosSecure();
  const [cardError, setCardError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [processing, setProcessing] = useState(false);
  const navigate = useNavigate();

  const handleFormModal = () => {
    if (totalPrice <= 0) {
      return toast.error("Please add some product!");
    } else {
      triggerFormSubmit();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (card === null) {
      return;
    }

    const { error } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("[error]", error);
      setCardError(error);
    } else {
      setCardError(error);
    }

    setProcessing(true);

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "unknown",
            name:
              `${billingData?.firstName} ${billingData?.lastName}` ||
              "anonymous",
          },
        },
      });

    if (confirmError) {
      console.log("[confirmError]", confirmError);
    }

    setProcessing(false);

    if (paymentIntent.status === "succeeded") {
      // save this paymented order info to the server
      const orderInfo = {
        email: user.email,
        transactionId: paymentIntent.id,
        totalPrice,
        quantity: cart.length,
        date: new Date(),
        status: "pending",
        billingData,
        items: cart,
      };

      axiosSecure
        .post("/orders", orderInfo, { params: { userEmail: user.email } })
        .then((res) => {
          if (
            res.data.insertResult.insertedId &&
            res.data.deleteResult.deletedCount > 0
          ) {
            setIsOpen(false);
            toast.success("Payment successful! Thank you for your purchase.");
            setCart([]);
            navigate("/");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    const getClientSecret = async () => {
      try {
        const res = await axiosSecure.post(
          "/payments/create-payment-intent",
          { price: totalPrice },
          { params: { userEmail: user.email } },
        );
        if (res.data.clientSecret) {
          setClientSecret(res.data.clientSecret);
        }
      } catch (err) {
        console.log(err);
      }
    };

    if (totalPrice > 0) {
      getClientSecret();
    }
  }, [totalPrice]);

  return (
    <>
      <div className="mt-10 text-center">
        <motion.button
          type="submit"
          whileTap={{ scale: 0.9 }}
          onClick={handleFormModal}
          className="rounded-2xl border border-black px-24 py-4 text-xl transition-all hover:border-transparent hover:bg-primary hover:text-white"
        >
          Place order
        </motion.button>
      </div>
      <Transition appear show={isOpen}>
        <Dialog
          open={isOpen}
          onClose={() => setIsOpen(false)}
          className="relative z-50 font-Poppins"
        >
          <div className="fixed inset-0 flex w-screen items-center justify-center overflow-y-auto bg-black/50 px-[4%]">
            <TransitionChild
              enter="ease-out duration-300"
              enterFrom="opacity-0 transform-[scale(95%)]"
              enterTo="opacity-100 transform-[scale(100%)]"
              leave="ease-in duration-300"
              leaveFrom="opacity-100 transform-[scale(100%)]"
              leaveTo="opacity-0 transform-[scale(95%)]"
            >
              <DialogPanel className="h-fit w-full max-w-2xl space-y-4 rounded-xl border bg-white px-6 py-8">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold">Payment details</h3>
                  <BsXLg
                    onClick={() => setIsOpen(false)}
                    className="text-cadetGray cursor-pointer text-xl transition-all hover:text-black"
                  />
                </div>
                <div>
                  <p className="font-semibold text-green-600">Demo Card:</p>
                  <div className="sm:space-x-2">
                    <small>
                      <span className="font-semibold text-green-600">
                        Card Number:{" "}
                      </span>
                      4242 4242 4242 4242
                    </small>
                    <br className="sm:hidden" />
                    <small className="mr-2 sm:mr-0">
                      <span className="font-semibold text-green-600">
                        MM/YY:{" "}
                      </span>
                      12 / 40
                    </small>
                    <small className="mr-2 sm:mr-0">
                      <span className="font-semibold text-green-600">
                        CVC:{" "}
                      </span>
                      123
                    </small>
                    <small>
                      <span className="font-semibold text-green-600">
                        ZIP:{" "}
                      </span>
                      12345
                    </small>
                  </div>
                </div>
                <form onSubmit={handleSubmit} className="!mt-8">
                  <CardElement
                    options={{
                      style: {
                        base: {
                          fontSize: "16px",
                          color: "#424770",
                          "::placeholder": {
                            color: "#aab7c4",
                          },
                        },
                        invalid: {
                          color: "#9e2146",
                        },
                      },
                    }}
                  />
                  {cardError && (
                    <p className="mt-3 text-[13px] text-red-600">
                      {cardError.message}
                    </p>
                  )}

                  <div className="mt-14 space-y-4 border-b pb-2 text-sm">
                    <div className="flex items-center justify-between">
                      <p>Subtotal</p>
                      <p>${formatPrice(totalPrice)}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <p>Sales tax</p>
                      <p>$0.00</p>
                    </div>
                  </div>
                  <div className="mb-10 mt-2 flex items-center justify-between text-sm font-semibold">
                    <p>Total</p>
                    <p>${formatPrice(totalPrice)}</p>
                  </div>

                  <button
                    type="submit"
                    disabled={!stripe || !clientSecret || processing}
                    className={`block w-full rounded-md bg-primary px-3 py-2 font-medium text-white transition-all ${!stripe || !clientSecret || (processing && "bg-[#b88f2fc7]")}`}
                  >
                    Place your order
                  </button>

                  <p className="mt-10 text-center text-xs">
                    Review the{" "}
                    <span className="cursor-pointer underline">
                      terms and conditions
                    </span>
                  </p>
                </form>
              </DialogPanel>
            </TransitionChild>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default PaymentModal;

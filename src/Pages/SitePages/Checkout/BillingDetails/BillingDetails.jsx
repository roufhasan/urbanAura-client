import { useContext } from "react";
import { useForm } from "react-hook-form";
import { CartContext } from "../../../../Providers/CartProvider";
import { formatPrice } from "../../../../utils/formatPrice";
import { calculateTotalPrice } from "../../../../utils/calculateTotalPrice";
import { AuthContext } from "../../../../Providers/AuthProvider";

const BillingDetails = () => {
  const { user } = useContext(AuthContext);
  const { cart } = useContext(CartContext);

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  const triggerFormSubmit = async () => {
    const isValid = await trigger();
    if (isValid) {
      handleSubmit(onSubmit)();
    }
  };

  return (
    <div className="mb-12 mt-16 px-[4%] md:px-[7%]">
      <div>
        <h1 className="my-9 pl-16 text-4xl font-semibold">Billing details</h1>
        <div className="flex flex-col gap-x-6 gap-y-16 md:flex-row">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full space-y-9 md:w-1/2 md:px-16"
          >
            <div className="flex gap-3 md:gap-7">
              <div>
                <label
                  htmlFor="firstName"
                  className={`${errors.firstName && "text-red-600"} font-medium" mb-5 inline-block`}
                >
                  First Name
                </label>
                <br />
                <input
                  className="h-[75px] w-full rounded-[10px] border border-[#9f9f9f] px-5 outline-none"
                  type="text"
                  id="firstName"
                  {...register("firstName", { required: true })}
                />
              </div>
              <div>
                <label
                  htmlFor="lastName"
                  className={`${errors.lastName && "text-red-600"} font-medium" mb-5 inline-block`}
                >
                  Last Name
                </label>
                <br />
                <input
                  className="h-[75px] w-full rounded-[10px] border border-[#9f9f9f] px-5 outline-none"
                  type="text"
                  id="lastName"
                  {...register("lastName", { required: true })}
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="country"
                className="mb-5 inline-block font-medium"
              >
                Country/Region
              </label>
              <select
                id="country"
                className="h-[75px] w-full rounded-[10px] border border-[#9f9f9f] px-5"
                {...register("country", { required: true })}
              >
                <option value="usa">USA</option>
                <option value="russia">Russia</option>
                <option value="bangladesh">Bangladesh</option>
                <option value="china">China</option>
                <option value="france">France</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="street"
                className={`${errors.street && "text-red-600"} font-medium" mb-5 inline-block`}
              >
                Street address
              </label>
              <br />
              <input
                className="h-[75px] w-full rounded-[10px] border border-[#9f9f9f] px-5 outline-none"
                type="text"
                id="street"
                {...register("street", { required: true })}
              />
            </div>
            <div>
              <label
                htmlFor="city"
                className={`${errors.city && "text-red-600"} font-medium" mb-5 inline-block`}
              >
                Town / City
              </label>
              <br />
              <input
                className="h-[75px] w-full rounded-[10px] border border-[#9f9f9f] px-5 outline-none"
                type="text"
                id="city"
                {...register("city", { required: true })}
              />
            </div>
            <div>
              <label
                htmlFor="province"
                className="mb-5 inline-block font-medium"
              >
                Province
              </label>
              <select
                id="province"
                className="h-[75px] w-full rounded-[10px] border border-[#9f9f9f] px-5"
                {...register("province", { required: true })}
              >
                <option value="western">Western Province</option>
                <option value="eastern">Eastern Province</option>
                <option value="northern">Northern Province</option>
                <option value="southern">Southern Province</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="zip_code"
                className={`${errors.zip_code && "text-red-600"} font-medium" mb-5 inline-block`}
              >
                ZIP code
              </label>
              <br />
              <input
                className="h-[75px] w-full rounded-[10px] border border-[#9f9f9f] px-5 outline-none"
                type="text"
                id="zip_code"
                {...register("zip_code", { required: true })}
              />
            </div>
            <div>
              <label
                htmlFor="phone"
                className={`${errors.firstName && "text-red-600"} font-medium" mb-5 inline-block`}
              >
                Phone
              </label>
              <br />
              <input
                className="h-[75px] w-full rounded-[10px] border border-[#9f9f9f] px-5 outline-none"
                type="tel"
                id="phone"
                {...register("phone", { required: true })}
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className={`${errors.email && "text-red-600"} font-medium" mb-5 inline-block`}
              >
                Email address
              </label>
              <br />
              <input
                className="h-[75px] w-full rounded-[10px] border border-[#9f9f9f] px-5 outline-none"
                type="email"
                id="email"
                value={user.email}
                readOnly
                {...register("email", { required: true })}
              />
            </div>
            <div>
              <textarea
                className="h-[75px] w-full rounded-[10px] border border-[#9f9f9f] px-5 py-6 outline-none"
                id="add_info"
                placeholder="Additional information"
                {...register("add_info")}
              ></textarea>
            </div>
          </form>
          <div className="w-full md:w-1/2">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-2xl font-medium">Product</p>
              <p className="text-2xl font-medium">Subtotal</p>
            </div>
            <ul className="mb-6 space-y-2">
              {cart &&
                cart.length > 0 &&
                cart.map((item) => (
                  <li
                    key={item._id}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <p className="text-[#9f9f9f]">{item.title}</p>
                      <p className="text-xs font-medium">X</p>
                      <p className="text-xs font-medium">{item.quantity}</p>
                    </div>
                    <p className="font-light">
                      ${formatPrice(item.quantity * item.price)}
                    </p>
                  </li>
                ))}
            </ul>
            <div className="mb-4 flex items-center justify-between">
              <p>Subtotal</p>
              <p className="font-light">
                ${formatPrice(calculateTotalPrice(cart))}
              </p>
            </div>
            <div className="flex items-center justify-between">
              <p>Total</p>
              <p className="text-2xl font-bold text-[#B88E2F]">
                ${formatPrice(calculateTotalPrice(cart))}
              </p>
            </div>

            <p className="mt-8 border-t border-[#d9d9d9] pt-6 font-light">
              Your personal data will be used to support your experience
              throughout this website, to manage access to your account, and for
              other purposes described in our{" "}
              <span className="cursor-pointer font-semibold">
                privacy policy.
              </span>
            </p>

            <div className="mt-10 text-center">
              <button
                type="submit"
                onClick={triggerFormSubmit}
                className="rounded-2xl border border-black px-24 py-4 text-xl transition-all hover:border-transparent hover:bg-[#B88E2F] hover:text-white"
              >
                Place order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillingDetails;

import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Rating } from "@smastrom/react-rating";
import { AuthContext } from "../../Providers/AuthProvider";

const Reviews = ({ productId }) => {
  const { user } = useContext(AuthContext);
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [formVisible, setFormVisible] = useState(false);
  const { register, handleSubmit, control } = useForm({
    mode: "onBlur",
    defaultValues: {
      name: user?.displayName || "anonymous",
      rating: 0,
    },
  });

  // Check if product is purchased or not
  const isProductPurchased = paymentHistory.some((payment) =>
    payment.items.some((product) => product.product_id === productId),
  );

  // Review Form Submit
  const onSubmit = (data) => {
    if (user.email) {
      data.email = user.email;
      data.date = new Date();

      axios
        .post("http://localhost:5000/review", data)
        .then((res) => {
          if (res.data.acknowledged) {
            toast.success("Review submitted!");
          }
        })
        .catch((err) => console.log(err));
    }
  };

  useEffect(() => {
    const getPaymentInfo = () => {
      axios
        .get("http://localhost:5000/payments", {
          params: { email: user?.email },
        })
        .then((res) => {
          setPaymentHistory(res.data);
        })
        .catch((err) => console.log(err));
    };
    if (user) {
      getPaymentInfo();
    }
  }, [user]);

  return (
    <div>
      <div className="flex flex-col justify-between gap-3 border-b border-gray-400 pb-4 sm:flex-row sm:items-center sm:gap-0">
        <div>
          <p className="mb-2 text-lg font-semibold md:text-2xl">
            Overall Rating
          </p>
          <div className="flex items-center">
            <p className="mr-1 text-lg font-semibold md:text-2xl">4.9</p>
            <Rating style={{ maxWidth: 140 }} value={3.5} readOnly />
            <p className="ml-2 mt-2 text-[#9f9f9f]">37512 reviews</p>
          </div>
        </div>
        <div>
          <button
            onClick={() => setFormVisible(true)}
            className="rounded bg-[#b88e2f] px-5 py-2.5 font-medium text-white transition-all hover:bg-[#9e7b28] md:px-6 md:py-4"
          >
            Write a review
          </button>
        </div>
      </div>

      {/* Review Form */}
      {formVisible && isProductPurchased && (
        <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
          <label htmlFor="rating" className="mb-1 inline-block font-medium">
            Rating:
          </label>
          <div className="w-36">
            <Controller
              control={control}
              name="rating"
              rules={{
                validate: (rating) => rating > 0,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Rating
                  value={value}
                  isRequired
                  onChange={onChange}
                  visibleLabelId="rating_label"
                  onBlur={onBlur}
                />
              )}
            />
          </div>
          <label
            htmlFor="review"
            className="mb-1 mt-4 inline-block font-medium"
          >
            Product Review:
          </label>
          <br />
          <textarea
            {...register("review")}
            id="review"
            className="h-20 w-full max-w-xl rounded-lg border border-gray-200 p-2 outline-none focus:border-gray-400"
          ></textarea>
          <br />
          <button
            type="submit"
            className="mt-6 rounded border border-[#b88e2f] px-8 py-2 font-medium transition-all hover:bg-[#b88e2f] hover:text-white"
          >
            Submit
          </button>
        </form>
      )}

      {/* Product not purchased error */}
      {formVisible && !isProductPurchased && (
        <p className="ml-2 mt-6 text-sm font-normal text-red-600">
          * You need to purchase this product to write a review.
        </p>
      )}

      {/* All reviews list */}
      <h3 className="mt-10 text-xl font-medium">Recent Reviews:</h3>
      <div className="divide-y">
        <div className="mt-7 text-sm">
          <div className="mt-3 flex items-center justify-between">
            <div className="flex items-center">
              <Rating style={{ maxWidth: 110 }} value={3} readOnly />
              <p className="ml-1 mt-1 text-[#9f9f9f]">Jackie Chan</p>
            </div>
            <p className="text-[#9f9f9f]">30-12-2024</p>
          </div>
          <p className="mt-1">Good product. I can recommend you.</p>
        </div>
        <div className="mt-7 text-sm">
          <div className="mt-3 flex items-center justify-between">
            <div className="flex items-center">
              <Rating style={{ maxWidth: 110 }} value={5} readOnly />
              <p className="ml-1 mt-1 text-[#9f9f9f]">Rouf Hasan</p>
            </div>
            <p className="text-[#9f9f9f]">30-12-2024</p>
          </div>
          <p className="mt-1">
            Ilhamduliallah valo peyechi product ta- seller er response onek VBIO
            Silo and behavior iS too good ei tar akta jiniSh durb01 Oita h010
            magnetic system Baki sh0b thik ase..l ecommend anyone easily that u
            can buy this product -this iS value for money in this budget
          </p>
        </div>
      </div>
    </div>
  );
};

export default Reviews;

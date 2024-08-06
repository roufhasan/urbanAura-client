import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Rating } from "@smastrom/react-rating";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { calculateAvgRating } from "../../utils/calculateAvgRating";
import { formatReviewDate } from "../../utils/formatReviewDate";

const Reviews = ({ productId, reviews, setReviews }) => {
  const { user } = useAuth();
  const { axiosSecure } = useAxiosSecure();
  const { register, handleSubmit, control, reset } = useForm({
    mode: "onBlur",
    defaultValues: {
      name: user?.displayName || "anonymous",
      rating: 0,
    },
  });

  const [paymentHistory, setPaymentHistory] = useState([]);
  const [formVisible, setFormVisible] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const paymentResponse = await axiosSecure.get(
          `/orders/${user?.email}`,
          {
            params: { userEmail: user?.email },
          },
        );
        setPaymentHistory(paymentResponse.data);

        isReviewSubmitted(reviews);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };

    fetchData();
  }, [productId, isSubmitted, user]);

  // Delete my review
  const deleteMyReview = async () => {
    try {
      const response = await axiosSecure.delete("/reviews", {
        data: {
          product_id: productId,
          email: user.email,
        },
        params: { userEmail: user.email },
      });
      if (response.data.acknowledged) {
        toast.success("Your review has been deleted");
        setIsSubmitted(false);
        setReviews((prevReviews) =>
          prevReviews.filter(
            (review) =>
              review.product_id !== productId || review.email !== user.email,
          ),
        );
        reset();
      }
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };

  // Check if product is purchased or not
  const isProductPurchased = paymentHistory.some((payment) =>
    payment.items.some((product) => product.product_id === productId),
  );

  // Check if current user submitted review
  const isReviewSubmitted = (reviews) => {
    if (reviews && reviews.length > 0) {
      const result = reviews.find((review) => review.email === user.email);
      if (result) {
        setIsSubmitted(true);
      }
    }
  };

  // Review Form Submit
  const onSubmit = (data) => {
    if (user.email) {
      data.product_id = productId;
      data.email = user.email;
      data.date = new Date();

      axiosSecure
        .post("/reviews", data, {
          params: { userEmail: user.email },
        })
        .then((res) => {
          if (res.data.acknowledged) {
            toast.success("Review submitted!");
            setFormVisible(false);
            setIsSubmitted(true);
            setReviews((prevReviews) => [data, ...prevReviews]);
          }
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div>
      <div className="flex flex-col justify-between gap-3 border-b border-gray-400 pb-4 sm:flex-row sm:items-center sm:gap-0">
        <div>
          <p className="mb-2 text-lg font-semibold md:text-2xl">
            Overall Rating
          </p>
          <div className="flex items-center">
            <p className="mr-1 text-lg font-semibold md:text-2xl">
              {calculateAvgRating(reviews)}
            </p>
            <Rating
              style={{ maxWidth: 140 }}
              value={calculateAvgRating(reviews)}
              readOnly
            />
            <p className="text-cadetGray ml-2 mt-2">{reviews.length} reviews</p>
          </div>
        </div>
        <div>
          {user ? (
            <>
              {isSubmitted ? (
                <button
                  onClick={deleteMyReview}
                  className="rounded bg-primary px-5 py-2.5 font-medium text-white transition-all hover:bg-[#9e7b28] md:px-6 md:py-4"
                >
                  Delete my review
                </button>
              ) : (
                <button
                  onClick={() => setFormVisible(true)}
                  className="rounded bg-primary px-5 py-2.5 font-medium text-white transition-all hover:bg-[#9e7b28] md:px-6 md:py-4"
                >
                  Write a review
                </button>
              )}
            </>
          ) : (
            <Link
              to="/login"
              className="rounded bg-primary px-5 py-2.5 font-medium text-white transition-all hover:bg-[#9e7b28] md:px-6 md:py-4"
            >
              Write a review
            </Link>
          )}
        </div>
      </div>

      {/* Review Form */}
      {formVisible && isProductPurchased && !isSubmitted && (
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
            className="mt-6 rounded border border-primary px-8 py-2 font-medium transition-all hover:bg-primary hover:text-white"
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
        {reviews &&
          reviews.length > 0 &&
          reviews.map((review, index) => (
            <div key={index} className="mt-7 text-sm">
              <div className="mt-3 flex items-center justify-between">
                <div className="flex items-center">
                  <Rating
                    style={{ maxWidth: 110 }}
                    value={review.rating}
                    readOnly
                  />
                  <p className="text-cadetGray ml-1 mt-1">{review.name}</p>
                </div>
                <p className="text-cadetGray">
                  {formatReviewDate(review.date)}
                </p>
              </div>
              <p className="mt-1">{review.review}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Reviews;

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { formatPrice } from "../../../../utils/formatPrice";
import { dateFormatMDY } from "../../../../utils/dateFormatMDY";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAuth from "../../../../hooks/useAuth";

const MyOrders = () => {
  const { user } = useAuth();
  const { axiosSecure } = useAxiosSecure();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user && user.email) {
      axiosSecure
        .get(`/orders/${user.email}`, {
          params: { userEmail: user.email },
        })
        .then((res) => setOrders(res.data))
        .catch((err) => {
          console.log(err);
        });
    }
  }, [user, axiosSecure]);

  return (
    <section className="mb-28 px-[4%] md:px-[7%]">
      <Helmet>
        <title>My Orders - UrbanAura Furniture</title>
      </Helmet>
      {orders && orders.length > 0 ? (
        <>
          <h3 className="pb-8 pt-6 font-semibold text-[#b88e2f]">
            My order history:
          </h3>
          <ul className="space-y-6">
            {orders.map((order, i) => (
              <li
                key={order._id}
                className={`space-y-6 border-b-[2px] border-gray-200 pb-6 ${i === orders.length - 1 && "border-none"}`}
              >
                <div>
                  <p className="truncate text-left text-sm text-gray-400">
                    <span className="text-[#b88e2f]">
                      Ordered #{order.items.length} items on:
                    </span>{" "}
                    {dateFormatMDY(order.date)}
                  </p>
                  {order.status === "cancelled" && (
                    <p className="truncate text-left text-sm text-green-600">
                      NOTE: You will get refund within 7 working days *
                    </p>
                  )}
                </div>
                {order.items.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between py-1 shadow-sm"
                  >
                    <Link to={`/products/${item.product_id}`} className="group">
                      <img
                        className="size-20 object-cover object-center transition-all group-hover:scale-95 sm:pt-1"
                        src={item.thumbnail}
                        alt={item.title}
                        loading="lazy"
                      />
                    </Link>
                    <div>
                      <motion.p
                        whileTap={{ scale: 0.9 }}
                        className="w-24 cursor-pointer truncate text-lg transition-all hover:text-[#b88e2f]"
                      >
                        <Link to={`/products/${item.product_id}`}>
                          {item.title}
                        </Link>
                      </motion.p>
                      <p className="w-14 truncate pt-1 text-sm text-gray-400 md:hidden">
                        Qty: {item.quantity}
                      </p>
                      <p className="w-fit min-w-16 truncate pt-1 text-sm text-gray-400 md:hidden">
                        $ {formatPrice(item.quantity * item.price)}
                      </p>
                    </div>
                    <p className="hidden w-14 truncate pt-1 text-sm text-gray-400 md:block">
                      Qty: {item.quantity}
                    </p>
                    <p className="hidden w-fit min-w-14 truncate pt-1 text-sm text-gray-400 md:block">
                      $ {formatPrice(item.quantity * item.price)}
                    </p>
                    <p
                      className={`h-fit w-24 truncate rounded-full p-1 text-center text-xs capitalize ${
                        order.status === "pending"
                          ? "bg-orange-200 text-orange-800"
                          : order.status === "processing"
                            ? "bg-blue-200 text-blue-800"
                            : order.status === "delivered"
                              ? "bg-green-200 text-green-800"
                              : order.status === "cancelled"
                                ? "bg-red-200 text-red-800"
                                : ""
                      }`}
                    >
                      {order.status}
                    </p>
                  </div>
                ))}
              </li>
            ))}
          </ul>
        </>
      ) : (
        <div className="min-h-[calc(100vh-240px)] text-center">
          <h1 className="mb-2 mt-20 text-2xl font-medium">
            You have not buyed any product yet.
          </h1>
          <div className="text-[#9f9f9f]">
            <Link to="/shop" className="text-[#b88e2f]">
              Browse our catalog
            </Link>{" "}
            and buy your desired items to see them here.
          </div>
        </div>
      )}
    </section>
  );
};

export default MyOrders;

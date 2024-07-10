import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { AuthContext } from "../../../../Providers/AuthProvider";
import { formatPrice } from "../../../../utils/formatPrice";

const MyOrders = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user && user.email) {
      axios
        .get("https://urbanaura-server.up.railway.app/payments", {
          params: { email: user.email },
        })
        .then((res) => setOrders(res.data))
        .catch((err) => console.log(err));
    }
  }, [user]);

  // Formate date of purchased product
  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return format(date, "MMM d, yyy");
  };

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
                <p className="truncate text-left text-sm text-gray-400">
                  <span className="text-[#b88e2f]">
                    Ordered #{order.items.length} items on:
                  </span>{" "}
                  {formatDate(order.date)}
                </p>
                {order.items.map((item) => (
                  <div
                    key={item._id}
                    className="flex justify-between py-1 shadow-sm"
                  >
                    <Link to={`/products/${item.product_id}`} className="group">
                      <img
                        src={item.thumbnail}
                        alt={item.title}
                        className="size-20 object-cover object-center transition-all group-hover:scale-95 sm:pt-1"
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
                    <p className="h-fit w-24 truncate rounded-full bg-gray-100 p-1 text-center text-xs">
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

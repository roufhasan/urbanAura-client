import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { AuthContext } from "../../../../Providers/AuthProvider";

const MyOrders = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user && user.email) {
      axios
        .get("http://localhost:5000/payments", {
          params: { email: user.email },
        })
        .then((res) => setOrders(res.data))
        .catch((err) => console.log(err));
    }
  }, [user]);

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return format(date, "MMM d, yyy");
  };
  console.log(orders);
  return (
    <section className="mb-28 px-[4%] md:px-[7%]">
      <h3 className="pb-8 pt-6 font-semibold text-[#b88e2f]">
        My order history:
      </h3>
      {orders && orders.length > 0 ? (
        <ul className="space-y-6">
          {orders.map((order, i) => (
            <li
              key={order._id}
              className={`space-y-6 border-b border-gray-200 pb-6 ${i === orders.length - 1 && "border-b-0"}`}
            >
              <p className="truncate text-right text-sm">
                <span className=" text-[#b88e2f]">Ordered on:</span>{" "}
                {formatDate(order.date)}
              </p>
              {order.items.map((item) => (
                <div key={item._id} className="flex justify-between">
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
                  </div>
                  <p className="hidden w-14 truncate pt-1 text-sm text-gray-400 md:block">
                    Qty: {item.quantity}
                  </p>
                  <p className="h-fit w-24 truncate rounded-full bg-gray-100 p-1 text-center text-xs">
                    {order.status}
                  </p>
                </div>
              ))}
            </li>
          ))}
        </ul>
      ) : (
        <div className="text-center">
          <h1 className="mb-2 text-2xl font-medium">
            You have not added any favourite products yet.
          </h1>
          <div className="text-[#9f9f9f]">
            <Link to="/shop" className="text-[#b88e2f]">
              Browse our catalog
            </Link>{" "}
            and buy your favourite items to see them here.
          </div>
        </div>
      )}
    </section>
  );
};

export default MyOrders;

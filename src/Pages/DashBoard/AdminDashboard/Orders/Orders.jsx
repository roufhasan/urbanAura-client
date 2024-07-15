import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import {
  IoChevronDownCircleOutline,
  IoChevronUpCircleOutline,
} from "react-icons/io5";
import { MdOutlinePendingActions } from "react-icons/md";
import OrderDetailsDropDown from "../../../../components/OrderDetailsDropDown/OrderDetailsDropDown";
import NoOrdersMessage from "../../../../components/NoOrdersMessage/NoOrdersMessage";
import { formatPrice } from "../../../../utils/formatPrice";
import { dateFormatMDY } from "../../../../utils/dateFormatMDY";
import { Helmet } from "react-helmet";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [expandedOrderId, setExpandedOrderId] = useState(null);

  // Filter orders with status "pending" or "processing"
  const pendingOrders = orders.filter(
    (order) => order.status === "pending" || order.status === "processing",
  );

  // Get the total number of pending or processing orders
  const totalOrders = pendingOrders.length;

  // Toggle all the ordered items of an user
  const toggleOrderDetails = (orderId) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
  };

  // Get all orders
  const getAllOrders = async () => {
    try {
      const res = await axios.get("http://localhost:5000/admin/payments");
      setOrders(res.data);
    } catch (err) {
      console.log("error fetching:", err);
    }
  };

  useEffect(() => {
    getAllOrders();
  }, []);

  // Update status of an order
  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const res = await axios.put(
        `http://localhost:5000/admin/payments/${orderId}/status`,
        {
          status: newStatus,
        },
      );
      if (res.data.modifiedCount > 0) {
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === orderId ? { ...order, status: newStatus } : order,
          ),
        );
        toast.success("Order status updated successfully");
      } else {
        toast.error("Failed to update order status");
      }
    } catch (err) {
      console.error("Error updating order status:", err);
      toast.error("Failed to update order status");
    }
  };

  return (
    <section className="w-full">
      {/* Change page title */}
      <Helmet>
        <title>Manage Orders - UrbanAura Furniture</title>
      </Helmet>

      <h3 className="flex items-center gap-1 bg-white px-[4%] py-7 text-xl font-semibold shadow-sm md:px-5">
        <MdOutlinePendingActions size={32} color="#b88e2f" /> Pending Orders:{" "}
        <span>{totalOrders}</span>
      </h3>

      {orders && orders.length > 0 ? (
        <div className="mt-6 overflow-x-auto bg-white shadow-sm">
          <table className="table table-auto overflow-x-auto">
            <thead>
              <tr className="text-xs text-black">
                <th>Name</th>
                <th>Email</th>
                <th>Ordered</th>
                <th>Total Price</th>
                <th>Quantity</th>
                <th>Status</th>
                <th>Actions</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody className="overflow-x-auto">
              {orders &&
                orders.length > 0 &&
                orders.map((order) => (
                  <React.Fragment key={order._id}>
                    <tr key={order._id} className="hover">
                      <td>{`${order.billingData.firstName} ${order.billingData.lastName}`}</td>
                      <td>{order.email}</td>
                      <td>{dateFormatMDY(order.date)}</td>
                      <td>${formatPrice(order.totalPrice)}</td>
                      <td>{order.quantity}</td>
                      <td>
                        <p
                          className={`w-20 rounded p-1 text-center text-xs capitalize ${
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
                      </td>
                      <td>
                        <select
                          className={`cursor-pointer rounded border border-gray-300 px-2 py-1 text-gray-800 ${
                            order.status === "cancelled" &&
                            "border-red-300 bg-red-200 text-red-800"
                          } ${order.status === "delivered" && "border-green-300 bg-green-200 text-green-800"}`}
                          disabled={
                            order.status === "cancelled" ||
                            order.status === "delivered"
                          }
                          value={order.status}
                          onChange={(e) =>
                            handleStatusChange(order._id, e.target.value)
                          }
                        >
                          <option
                            value="pending"
                            disabled={[
                              "pending",
                              "processing",
                              "delivered",
                              "cancelled",
                            ].includes(order.status)}
                            className={
                              [
                                "pending",
                                "processing",
                                "delivered",
                                "cancelled",
                              ].includes(order.status)
                                ? "text-gray-400"
                                : ""
                            }
                          >
                            Pending
                          </option>
                          <option
                            value="processing"
                            disabled={[
                              "processing",
                              "delivered",
                              "cancelled",
                            ].includes(order.status)}
                            className={
                              ["processing", "delivered", "cancelled"].includes(
                                order.status,
                              )
                                ? "text-gray-400"
                                : ""
                            }
                          >
                            Processing
                          </option>
                          <option
                            value="delivered"
                            disabled={["delivered", "cancelled"].includes(
                              order.status,
                            )}
                            className={
                              ["delivered", "cancelled"].includes(order.status)
                                ? "text-gray-400"
                                : ""
                            }
                          >
                            Delivered
                          </option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>
                      <td>
                        <button
                          onClick={() => toggleOrderDetails(order._id)}
                          className="flex items-center rounded border border-gray-300 px-2 py-1 text-gray-800"
                        >
                          {expandedOrderId === order._id ? (
                            <IoChevronUpCircleOutline className="h-5 w-5" />
                          ) : (
                            <IoChevronDownCircleOutline className="h-5 w-5" />
                          )}
                          <span className="ml-2">Details</span>
                        </button>
                      </td>
                    </tr>
                    {/* See all the items of an user ordered */}
                    {expandedOrderId === order._id && (
                      <OrderDetailsDropDown order={order} />
                    )}
                  </React.Fragment>
                ))}
            </tbody>
          </table>
        </div>
      ) : (
        <NoOrdersMessage />
      )}
    </section>
  );
};

export default Orders;

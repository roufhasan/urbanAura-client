import { Link } from "react-router-dom";
import { formatPrice } from "../../utils/formatPrice";

const OrderDetailsDropDown = ({ order }) => {
  return (
    <>
      <tr className="overflow-x-auto bg-gray-500 text-xs text-white">
        <th>Item</th>
        <th>Price</th>
        <th>Quantity</th>
        <th>Size</th>
        <th>Color</th>
        <th colSpan="3"></th>
      </tr>
      {order.items &&
        order.items.length > 0 &&
        order.items.map((item) => (
          <tr key={item._id} className="hover overflow-x-auto">
            <td className="flex items-center">
              <Link
                to={`/products/${item.product_id}`}
                className="mr-4 h-16 w-16"
              >
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="h-full w-full transition-all hover:scale-95"
                />
              </Link>
              <Link
                to={`/products/${item.product_id}`}
                className="text-sm font-medium transition-all hover:text-[#b88e2f]"
              >
                {item.title}
              </Link>
            </td>
            <td>${formatPrice(item.price)}</td>
            <td>{item.quantity}</td>
            <td>{item.size}</td>
            <td>
              <div
                style={{ backgroundColor: item.color }}
                className="tooltip size-4 rounded-full"
                data-tip={item.color}
              ></div>
            </td>
            <td colSpan="3"></td>
          </tr>
        ))}
    </>
  );
};

export default OrderDetailsDropDown;

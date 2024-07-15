import { FaBoxOpen } from "react-icons/fa";

const NoOrdersMessage = () => {
  return (
    <div className="flex h-[calc(100vh-88px)] w-full items-center justify-center">
      <div className="h-full w-full rounded-md bg-white px-[4%] py-8 text-center md:px-5">
        <FaBoxOpen className="mx-auto mb-4 h-12 w-12 text-gray-400" />
        <h2 className="mb-2 text-lg font-semibold" style={{ color: "#b88e2f" }}>
          No Recent Orders
        </h2>
        <p className="text-gray-600">
          No recent orders have been placed. When new orders come in, you will
          be able to view and manage them here.
        </p>
      </div>
    </div>
  );
};

export default NoOrdersMessage;

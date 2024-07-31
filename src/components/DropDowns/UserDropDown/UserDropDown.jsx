import { useState } from "react";
import { Link } from "react-router-dom";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import toast from "react-hot-toast";
import {
  BsBox2,
  BsBoxArrowInLeft,
  BsPersonCircle,
  BsPersonGear,
} from "react-icons/bs";
import useAuth from "../../../hooks/useAuth";

const UserDropDown = ({ setCart, setFavouriteItems }) => {
  const { user, logOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  // Handle user logout
  const handleUserLogOut = () => {
    logOut()
      .then(() => {
        toast.success("Logged out!");
      })
      .catch((err) => console.error(err));
    setCart([]);
    setFavouriteItems([]);
  };

  return (
    <Popover>
      <PopoverButton
        onClick={() => setIsOpen(true)}
        className="size-8 focus:outline-none"
      >
        {user && user.photoURL ? (
          <img
            className="h-full w-full rounded-full"
            src={user.photoURL}
            alt={`${user && user?.displayName} profile img`}
            loading="lazy"
          />
        ) : (
          <BsPersonCircle size={28} />
        )}
      </PopoverButton>

      {isOpen && (
        <PopoverPanel
          anchor="bottom"
          className="mt-10 rounded border bg-white px-4 py-3 text-gray-600 shadow"
        >
          <Link
            onClick={() => setIsOpen(false)}
            to="/my-orders"
            className="mb-4 flex items-center gap-2 text-sm"
          >
            <BsBox2 size={18} className="w-6" />
            <span className="border-b border-transparent transition-all hover:border-[#b88e2f] hover:text-[#b88e2f]">
              My Orders
            </span>
          </Link>
          <Link
            onClick={() => setIsOpen(false)}
            to="/account-settings"
            className="mb-4 flex items-center gap-2 text-sm"
          >
            <BsPersonGear size={24} />
            <span className="border-b border-transparent transition-all hover:border-[#b88e2f] hover:text-[#b88e2f]">
              Manage My Account
            </span>
          </Link>
          <button
            onClick={handleUserLogOut}
            className="flex items-center gap-2 text-sm"
          >
            <BsBoxArrowInLeft size={24} />
            <span className="border-b border-transparent transition-all hover:border-[#b88e2f] hover:text-[#b88e2f]">
              Logout
            </span>
          </button>
        </PopoverPanel>
      )}
    </Popover>
  );
};

export default UserDropDown;

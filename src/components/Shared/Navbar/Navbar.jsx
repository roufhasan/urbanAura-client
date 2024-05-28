import { useContext, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import {
  BsBox2,
  BsBoxArrowInLeft,
  BsCart3,
  BsHeart,
  BsList,
  BsPersonExclamation,
  BsPersonGear,
  BsSearch,
} from "react-icons/bs";
import { AuthContext } from "../../../Providers/AuthProvider";
import logo from "../../../assets/logo/logo.png";
import MobileNavbar from "./MobileNavbar";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [showMenu, setShowMenu] = useState(false);
  const location = useLocation();
  const sideBarRef = useRef();
  const menuRef = useRef();

  // Mobile Menu Toggle Handler
  window.addEventListener("click", (e) => {
    if (e.target === sideBarRef.current || e.target === menuRef.current) {
      setShowMenu(!showMenu);
    }
  });

  // Handle user logout
  const handleUserLogOut = () => {
    logOut()
      .then(() => console.log("Sign-out successful"))
      .catch((err) => console.error(err));
  };

  // Navigation Menu Links
  const navItems = [
    { link: "/", text: "Home" },
    { link: "/shop", text: "Shop" },
    { link: "/about", text: "About" },
    { link: "/contact", text: "Contact" },
  ];

  // Desktop User Profile Imgae Dropdown Button
  const userDropDown = (
    <>
      <Popover>
        <PopoverButton className="size-8 focus:outline-none">
          <img
            loading="eazy"
            src={user && user?.photoURL}
            alt={`${user && user?.displayName} profile img`}
            className="h-full w-full rounded-full"
          />
        </PopoverButton>
        <PopoverPanel
          anchor="bottom"
          className="mt-10 rounded border bg-white px-4 py-3 text-gray-600 shadow"
        >
          <Link
            to="/account-settings"
            className="mb-4 flex items-center gap-2 text-sm"
          >
            <span>
              <BsPersonGear size={24} />
            </span>
            Manage My Account
          </Link>
          <Link
            to="/my-orders"
            className="mb-4 flex items-center gap-2 text-sm"
          >
            <span className="w-6">
              <BsBox2 size={18} />
            </span>
            My Orders
          </Link>
          <button
            onClick={handleUserLogOut}
            className="flex items-center gap-2 text-sm"
          >
            <BsBoxArrowInLeft size={24} />
            Logout
          </button>
        </PopoverPanel>
      </Popover>
    </>
  );

  return (
    <nav className="relative items-center justify-between md:flex md:py-7 md:pl-[4%] md:pr-[7%]">
      <div className="flex items-center justify-between px-[4%]">
        {/* Mobile Menu Toggle Button */}
        <div
          onClick={() => setShowMenu(true)}
          className="cursor-pointer md:hidden"
        >
          <BsList size={24} />
        </div>

        {/* Logo & Title */}
        <Link to="/" className="flex items-center">
          <img className="w-[50px]" src={logo} alt="urbanAura logo" />
          <h1 className="-ml-1 font-Montserrat text-2xl font-bold md:text-[34px]">
            Furniro
          </h1>
        </Link>

        {/* Mobile Cart & Favourite Button */}
        <ul className="flex gap-4 md:hidden">
          <Link to="/favourite">
            <BsHeart size={18} />
          </Link>
          <Link to="/cart">
            <BsCart3 size={18} />
          </Link>
        </ul>
      </div>

      {/* Mobile Search Field */}
      {location.pathname === "/" && (
        <div className="flex h-14 w-full flex-col justify-center bg-[#f2f3f5] md:hidden">
          <form className="relative mx-auto h-11 w-11/12">
            <input
              className="h-full w-full py-1 pl-3 pr-10 outline-none"
              type="text"
              placeholder="Search Here..."
            />
            <button
              className="absolute right-3 top-1/2 -translate-y-1/2"
              type="submit"
            >
              <BsSearch size={16} />
            </button>
          </form>
        </div>
      )}

      {/* Desktop Navigation Links */}
      <ul className="hidden items-center gap-x-[75px] font-medium md:flex">
        {navItems.map((nav) => (
          <li key={nav.text}>
            <Link to={nav.link}>{nav.text}</Link>
          </li>
        ))}
      </ul>

      {/* Desktop Navigation Buttons */}
      <ul className="hidden items-center gap-x-11 md:flex">
        <li>
          <BsSearch size={24} />
        </li>
        <li>
          {user ? (
            userDropDown
          ) : (
            <Link to="/login">
              <BsPersonExclamation size={28} />
            </Link>
          )}
        </li>
        <li>
          <BsHeart size={24} />
        </li>
        <li>
          <BsCart3 size={24} />
        </li>
      </ul>

      {/* Mobile Sidebar Menu */}
      {showMenu && (
        <MobileNavbar
          sideBarRef={sideBarRef}
          menuRef={menuRef}
          setShowMenu={setShowMenu}
          showMenu={showMenu}
          navItems={navItems}
          handleUserLogOut={handleUserLogOut}
        />
      )}
    </nav>
  );
};

export default Navbar;

import { useContext, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import {
  BsBox2,
  BsBoxArrowInLeft,
  BsCart3,
  BsHeart,
  BsList,
  BsPersonCircle,
  BsPersonExclamation,
  BsPersonGear,
  BsSearch,
} from "react-icons/bs";
import { AuthContext } from "../../../Providers/AuthProvider";
import { CartContext } from "../../../Providers/CartProvider";
import MobileNavbar from "./MobileNavbar";
import CartDropDown from "../../CartDropDown/CartDropDown";
import logo from "../../../assets/logo/logo.png";
import { FavouriteContext } from "../../../Providers/FavouriteProvider";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const { setCart } = useContext(CartContext);
  const { favouriteItems, getFavouriteItems } = useContext(FavouriteContext);
  const [showMenu, setShowMenu] = useState(false);
  const location = useLocation();
  const sideBarRef = useRef();
  const menuRef = useRef();

  useEffect(() => {
    getFavouriteItems();
  }, [getFavouriteItems]);

  // Mobile Menu Toggle Handler
  window.addEventListener("click", (e) => {
    if (e.target === sideBarRef.current || e.target === menuRef.current) {
      setShowMenu(!showMenu);
    }
  });

  // Handle user logout
  const handleUserLogOut = () => {
    setCart([]);
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
          {user && user.photoURL ? (
            <img
              loading="eazy"
              src={user.photoURL}
              alt={`${user && user?.displayName} profile img`}
              className="h-full w-full rounded-full"
            />
          ) : (
            <BsPersonCircle size={28} />
          )}
        </PopoverButton>
        <PopoverPanel
          anchor="bottom"
          className="mt-10 rounded border bg-white px-4 py-3 text-gray-600 shadow"
        >
          <Link
            to="/account-settings"
            className="mb-4 flex items-center gap-2 text-sm"
          >
            <BsPersonGear size={24} />
            <span className="border-b border-transparent transition-all hover:border-[#b88e2f] hover:text-[#b88e2f]">
              Manage My Account
            </span>
          </Link>
          <Link
            to="/my-orders"
            className="mb-4 flex items-center gap-2 text-sm"
          >
            <BsBox2 size={18} className="w-6" />
            <span className="border-b border-transparent transition-all hover:border-[#b88e2f] hover:text-[#b88e2f]">
              My Orders
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
      </Popover>
    </>
  );

  return (
    <nav className="relative items-center justify-between md:flex md:py-7 md:pl-[4%] md:pr-[7%]">
      <div className="flex items-center justify-between px-[4%] md:pl-[4%] md:pr-0">
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
          <h1 className="-ml-1 font-Montserrat text-2xl font-bold lg:text-[28px] xl:text-[34px]">
            UrbanAura
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
      <ul className="hidden items-center font-medium md:flex md:gap-x-6 lg:gap-x-8 xl:gap-x-[75px]">
        {navItems.map((nav) => (
          <li key={nav.text}>
            <Link to={nav.link}>{nav.text}</Link>
          </li>
        ))}
      </ul>

      {/* Desktop Navigation Buttons */}
      <ul className="hidden items-center md:flex md:gap-x-6 lg:gap-x-8 xl:gap-x-10">
        <li>
          <BsSearch className="cursor-pointer text-xl lg:text-[21px] xl:text-2xl" />
        </li>
        <li>
          {user ? (
            userDropDown
          ) : (
            <Link to="/login">
              <BsPersonExclamation className="cursor-pointer text-[25px] lg:text-[26px] xl:text-[28px]" />
            </Link>
          )}
        </li>
        <li>
          <div className="relative">
            {user ? (
              <Link to="/favourite">
                <BsHeart className="cursor-pointer text-2xl lg:text-[23px]" />
                {favouriteItems && favouriteItems.length > 0 && (
                  <p className="absolute -right-1 -top-1 flex size-[14px] items-center justify-center rounded-full bg-red-500 text-xs text-white">
                    {favouriteItems.length}
                  </p>
                )}
              </Link>
            ) : (
              <Link to={user ? "/favourite" : "/login"}>
                <BsHeart className="cursor-pointer text-xl lg:text-2xl lg:text-[21px]" />
              </Link>
            )}
          </div>
        </li>
        <li>
          <CartDropDown user={user} />
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

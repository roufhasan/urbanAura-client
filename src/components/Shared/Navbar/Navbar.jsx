import { useContext, useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  BsCart3,
  BsHeart,
  BsList,
  BsPersonExclamation,
  BsSearch,
} from "react-icons/bs";
import { AuthContext } from "../../../Providers/AuthProvider";
import { CartContext } from "../../../Providers/CartProvider";
import { FavouriteContext } from "../../../Providers/FavouriteProvider";
import SearchDropDown from "../../SearchDropDown/SearchDropDown";
import UserDropDown from "../../UserDropDown/UserDropDown";
import CartDropDown from "../../CartDropDown/CartDropDown";
import MobileNavbar from "./MobileNavbar";
import useDebounce from "../../../hooks/useDebounce";
import { navItems } from "../../../data/navItems";
import logo from "../../../assets/logo/logo.png";

const Navbar = () => {
  // Context
  const { user } = useContext(AuthContext);
  const { setCart } = useContext(CartContext);
  const { favouriteItems, getFavouriteItems } = useContext(FavouriteContext);

  // State
  const [showMenu, setShowMenu] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  // Ref
  const sideBarRef = useRef();
  const menuRef = useRef();

  // Router
  const location = useLocation();
  const navigate = useNavigate();

  // Debounce search input
  const debouncedSearchValue = useDebounce(searchValue, 300);

  // Fetch favourite items of a user
  useEffect(() => {
    getFavouriteItems();
  }, [getFavouriteItems]);

  // Perform search when debounced search value changes
  useEffect(() => {
    if (debouncedSearchValue === "" || debouncedSearchValue.length === 0) {
      return setSearchResults([]);
    } else {
      axios
        .get(`http://localhost:5000/search/${debouncedSearchValue}`)
        .then((res) => setSearchResults(res.data))
        .catch((err) => console.error(err));
    }
  }, [debouncedSearchValue]);

  // Clear search input and results
  const clearSearch = () => {
    setSearchValue("");
    setSearchResults([]);
  };

  // Handle form submission for search
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const searchText = e.target.search.value;
    navigate(`/search/${searchText}`);
    clearSearch();
  };

  // Toggle mobile menu Visibility
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (e.target === sideBarRef.current || e.target === menuRef.current) {
        setShowMenu(!showMenu);
      }
    };

    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [showMenu]);

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
          <form
            onSubmit={handleSearchSubmit}
            className="relative mx-auto h-11 w-11/12"
          >
            <input
              className="h-full w-full py-1 pl-3 pr-10 outline-none"
              type="search"
              value={searchValue}
              name="search"
              placeholder="Search"
              autoComplete="off"
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <button
              className="absolute right-3 top-1/2 -translate-y-1/2"
              type="submit"
            >
              <BsSearch size={16} />
            </button>
            {/* Search Drop Down */}
            {searchResults && searchResults.length > 0 && (
              <SearchDropDown
                products={searchResults}
                clearSearch={clearSearch}
              />
            )}
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
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              className="w-full max-w-48 rounded border px-3 py-1 pr-8 outline-none focus:border-black"
              type="search"
              value={searchValue}
              name="search"
              placeholder="Search"
              autoComplete="off"
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <button
              type="submit"
              className="absolute bottom-0 right-2 top-0 mb-auto mt-auto cursor-pointer text-lg text-gray-700"
            >
              <BsSearch />
            </button>
            {/* Search Drop Down */}
            {searchResults && searchResults.length > 0 && (
              <SearchDropDown
                products={searchResults}
                clearSearch={clearSearch}
              />
            )}
          </form>
        </li>
        <li>
          {user ? (
            <UserDropDown setCart={setCart} />
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
          setCart={setCart}
        />
      )}
    </nav>
  );
};

export default Navbar;

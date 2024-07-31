import { Link, useNavigate } from "react-router-dom";
import {
  BsBox2,
  BsBoxArrowInLeft,
  BsPersonExclamation,
  BsPersonGear,
  BsXLg,
} from "react-icons/bs";
import toast from "react-hot-toast";
import { LuLayoutDashboard } from "react-icons/lu";
import useAdmin from "../../../hooks/useAdmin";
import useAuth from "../../../hooks/useAuth";
import useFavourite from "../../../hooks/useFavourite";

const MobileNavbar = ({
  sideBarRef,
  menuRef,
  setShowMenu,
  showMenu,
  navItems,
  setCart,
}) => {
  const { user, logOut } = useAuth();
  const { setFavouriteItems } = useFavourite();
  const navigate = useNavigate();

  // Check currently logged in user email is admin email or not
  const { isAdmin } = useAdmin();

  // Handle user logout
  const handleUserLogOut = () => {
    logOut()
      .then(() => {
        toast.success("Logged out!");
        navigate("/");
      })
      .catch((err) => console.error(err));

    setCart([]);
    setFavouriteItems([]);
    setShowMenu(false);
  };

  return (
    <div
      ref={sideBarRef}
      className="fixed top-0 z-50 min-h-screen w-full bg-black/50 md:hidden"
    >
      <div ref={menuRef} className="min-h-screen w-3/4 bg-white">
        <div className="flex items-center justify-between bg-[#fcf8f3] px-[4%] py-4">
          <p className="text-lg font-medium">
            Browse
            <span className="ml-1 text-2xl">UrbanAura</span>
          </p>
          <BsXLg
            onClick={() => setShowMenu(false)}
            className="cursor-pointer font-medium"
            size={20}
          />
        </div>

        <div>
          <h3 className="bg-[#f2f3f5] px-[4%] py-1 text-lg">Menu</h3>
          <ul className="px-[4%]">
            {navItems.map((nav) => (
              <li
                onClick={() => setShowMenu(!showMenu)}
                key={nav.text}
                className="mt-4 first:mt-2"
              >
                <Link to={nav.link} className="block w-1/2">
                  {nav.text}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mt-8 bg-[#f2f3f5] px-[4%] py-1 text-lg">Account</h3>
          {user ? (
            <div className="mt-2 px-[4%]">
              <Link
                onClick={() => setShowMenu(!showMenu)}
                to="/dashboard"
                className="mb-4 flex items-center gap-2"
              >
                <span>
                  <LuLayoutDashboard size={21} />
                </span>
                Dashboard
              </Link>
              <Link
                onClick={() => setShowMenu(!showMenu)}
                to="/my-orders"
                className="mb-4 flex items-center gap-2"
              >
                <span className="w-6">
                  <BsBox2 size={18} />
                </span>
                My Orders
              </Link>
              {user && isAdmin && (
                <Link
                  onClick={() => setShowMenu(!showMenu)}
                  to="/account-settings"
                  className="mb-4 flex items-center gap-2"
                >
                  <span>
                    <BsPersonGear size={24} />
                  </span>
                  Manage My Account
                </Link>
              )}
              <button
                onClick={handleUserLogOut}
                className="flex items-center gap-2"
              >
                <BsBoxArrowInLeft size={24} />
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              onClick={() => setShowMenu(!showMenu)}
              className="mt-2 flex items-center gap-2 px-[4%]"
            >
              <BsPersonExclamation size={28} /> Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default MobileNavbar;

import { NavLink } from "react-router-dom";
import { BsBox2, BsCart3, BsPower, BsX } from "react-icons/bs";
import { LuLayoutDashboard } from "react-icons/lu";
import logo from "../../assets/logo/logo.png";

const MobileDashNav = ({ sideBarRef, setShowNavbar }) => {
  return (
    <div
      ref={sideBarRef}
      className="fixed top-0 z-50 flex h-fit min-h-screen w-full justify-between overflow-y-auto bg-black/50 md:hidden"
    >
      {/* Why overflow y scroll bar not showing in this div  */}
      <div className="flex h-fit min-h-screen w-3/5 flex-col justify-between overflow-y-auto bg-[#111827] pb-10 pt-7 text-white">
        <div className="w-full">
          {/* Logo & Title */}
          <NavLink
            onClick={() => setShowNavbar(false)}
            to="/"
            className="flex items-center px-5"
          >
            <img
              className="mr-1 w-5 lg:w-7 xl:w-8"
              src={logo}
              alt="urbanAura logo"
              loading="lazy"
            />
            <h1 className="-ml-1 font-Montserrat text-2xl font-bold lg:text-[28px]">
              rbanAura
            </h1>
          </NavLink>
          <div className="mt-10 space-y-7">
            <NavLink
              onClick={() => setShowNavbar(false)}
              to="/dashboard"
              end
              className={({ isActive }) =>
                `group flex items-center gap-2 px-5 py-1 ${isActive && "bg-gray-700 bg-opacity-25"}`
              }
            >
              <span>
                <LuLayoutDashboard
                  size={21}
                  className="transition-all duration-200 group-hover:text-primary"
                />
              </span>
              Dashboard
            </NavLink>
            <NavLink
              onClick={() => setShowNavbar(false)}
              to="/dashboard/orders"
              className={({ isActive }) =>
                `group flex items-center gap-2 px-5 py-1 ${isActive && "bg-gray-700 bg-opacity-25"}`
              }
            >
              <span>
                <BsCart3
                  size={21}
                  className="w-6 transition-all duration-200 group-hover:text-primary"
                />
              </span>
              Orders
            </NavLink>
            <NavLink
              onClick={() => setShowNavbar(false)}
              to="/dashboard/products"
              className={({ isActive }) =>
                `group flex items-center gap-2 px-5 py-1 ${isActive && "bg-gray-700 bg-opacity-25"}`
              }
            >
              <span>
                <BsBox2
                  size={18}
                  className="w-6 transition-all duration-200 group-hover:text-primary"
                />
              </span>
              Products
            </NavLink>
          </div>
        </div>
        <button className="mt-10 flex items-center gap-2 px-5 transition-all duration-200">
          <span>
            <BsPower size={20} className="w-6 text-[#ffb300]" />
          </span>
          Log Out
        </button>
      </div>

      <div
        onClick={() => setShowNavbar(false)}
        className="cursor-pointer pr-2 pt-2 text-3xl font-bold text-white"
      >
        <BsX />
      </div>
    </div>
  );
};

export default MobileDashNav;

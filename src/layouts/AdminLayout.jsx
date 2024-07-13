import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import logo from "../assets/logo/logo.png";
import { LuLayoutDashboard } from "react-icons/lu";
import { BsBox2, BsCart3, BsList, BsPower } from "react-icons/bs";
import MobileDashNav from "../components/MobileDashNav/MobileDashNav";

const AdminLayout = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showNavbar, setShowNavbar] = useState(false);

  // Check currently logged in user email is admin email or not
  const isAdmin = user && user.email && user.email === "roufhasan5@gmail.com";
  if (!isAdmin) {
    navigate("/");
  }

  // Ref
  const sideBarRef = useRef();

  // Toggle mobile dashboard side navbar visibility
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (e.target === sideBarRef.current) {
        setShowNavbar(!showNavbar);
      }
    };

    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [showNavbar]);

  return (
    <section className="mx-auto w-full max-w-[1440px] font-Poppins md:flex">
      {/* Small device navbar toggle button */}
      <div
        onClick={() => setShowNavbar(true)}
        className="px-[4%] pb-3 pt-2 text-[26px] md:hidden"
      >
        <BsList />
      </div>
      {showNavbar && (
        <MobileDashNav sideBarRef={sideBarRef} setShowNavbar={setShowNavbar} />
      )}

      {/* medium to upper device side navbar */}
      <nav className="hidden h-full min-h-screen flex-col justify-between overflow-y-auto bg-[#111827] pb-10 pt-7 text-white md:flex">
        <div>
          {/* Logo & Title */}
          <NavLink to="/" className="flex items-center px-5">
            <img
              className="mr-1 w-5 lg:w-7 xl:w-8"
              src={logo}
              alt="urbanAura logo"
            />
            <h1 className="-ml-1 font-Montserrat text-2xl font-bold lg:text-[28px]">
              rbanAura
            </h1>
          </NavLink>
          <div className="mt-10 space-y-7">
            <NavLink
              to="/dashboard"
              end
              className={({ isActive }) =>
                `group flex items-center gap-2 px-5 py-1 ${isActive && "bg-gray-700 bg-opacity-25"}`
              }
            >
              <span>
                <LuLayoutDashboard
                  size={21}
                  className="transition-all duration-200 group-hover:text-[#b88e2f]"
                />
              </span>
              Dashboard
            </NavLink>
            <NavLink
              to="/dashboard/orders"
              className={({ isActive }) =>
                `group flex items-center gap-2 px-5 py-1 ${isActive && "bg-gray-700 bg-opacity-25"}`
              }
            >
              <span>
                <BsCart3
                  size={21}
                  className="w-6 transition-all duration-200 group-hover:text-[#b88e2f]"
                />
              </span>
              Orders
            </NavLink>
            <NavLink
              to="/dashboard/products"
              className={({ isActive }) =>
                `group flex items-center gap-2 px-5 py-1 ${isActive && "bg-gray-700 bg-opacity-25"}`
              }
            >
              <span>
                <BsBox2
                  size={18}
                  className="w-6 transition-all duration-200 group-hover:text-[#b88e2f]"
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
      </nav>

      {/* Routes Page will be here */}
      <div className="flex-1 bg-[#f3f4fa] px-[4%] pt-7 md:px-5">
        <Outlet />
      </div>
    </section>
  );
};

export default AdminLayout;

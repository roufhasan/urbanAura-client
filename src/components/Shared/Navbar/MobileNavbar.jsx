import { BsPersonExclamation, BsXLg } from "react-icons/bs";
import { Link } from "react-router-dom";

const MobileNavbar = ({
  sideBarRef,
  menuRef,
  setShowMenu,
  showMenu,
  navItems,
}) => {
  return (
    <div
      ref={sideBarRef}
      className="fixed top-0 z-50 min-h-screen w-full bg-black/50 md:hidden"
    >
      <div ref={menuRef} className="min-h-screen w-3/4 bg-white">
        <div className="flex items-center justify-between bg-[#fcf8f3] px-[4%] py-4">
          <p className="text-lg font-medium">
            Browse
            <span className="ml-1 text-2xl">Furniro</span>
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
          <Link
            to="/login"
            onClick={() => setShowMenu(!showMenu)}
            className="mt-2 flex items-center gap-2 px-[4%]"
          >
            <BsPersonExclamation size={28} /> Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MobileNavbar;

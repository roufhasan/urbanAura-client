import { Link } from "react-router-dom";
import { BsChevronRight } from "react-icons/bs";
import navigationBg from "../../assets/images/navigation-bg.png";

const NavBanner = ({ location }) => {
  const urlPath = location.pathname.split("/").join("");

  return (
    <div
      className="h-[316px] max-h-[316px] w-full bg-cover bg-left-top"
      style={{ background: `url(${navigationBg})` }}
    >
      <div className="flex h-full w-full flex-col justify-center gap-3 bg-black/5 capitalize backdrop-blur-sm">
        <h1 className="text-center text-5xl font-medium">{urlPath}</h1>
        <div className="flex items-center justify-center gap-[6px]">
          <Link to="/" className="font-medium">
            Home
          </Link>
          <BsChevronRight className="text-xl font-bold" />
          <Link
            to={location.pathname}
            className="font-light transition-all hover:font-medium"
          >
            {urlPath}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NavBanner;

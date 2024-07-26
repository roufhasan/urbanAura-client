import { Link } from "react-router-dom";
import { BsChevronRight } from "react-icons/bs";
/* images */
import navigationBg from "../../assets/images/navigation-bg.png";
import logo from "../../assets/logo/logo.png";

const PageBanner = ({ pathname }) => {
  const urlPath = pathname?.split("/")?.join("");

  return (
    <div
      className="h-64 max-h-64 w-full bg-cover bg-left-top md:h-[316px] md:max-h-[316px]"
      style={{ background: `url(${navigationBg})` }}
    >
      <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-black/5 capitalize backdrop-blur-sm">
        <img
          className="size-12 object-cover object-center lg:size-16"
          src={logo}
          alt="urban aura logo"
          loading="lazy"
        />
        <h1 className="text-2xl font-medium md:text-3xl lg:text-5xl">
          {urlPath}
        </h1>
        <div className="flex items-center justify-center gap-[6px]">
          <Link to="/" className="font-medium">
            Home
          </Link>
          <BsChevronRight className="text-xl font-bold" />
          <p className="font-light">{urlPath}</p>
        </div>
      </div>
    </div>
  );
};

export default PageBanner;

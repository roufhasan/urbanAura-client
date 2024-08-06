import { Link } from "react-router-dom";
import { BsChevronRight } from "react-icons/bs";

const BreadCrumbs = ({ title }) => {
  return (
    <div className="bg-cream flex flex-wrap items-center gap-4 px-[4%] py-8 md:gap-6 md:px-[7%]">
      <div className="flex items-center gap-2 md:gap-4">
        <Link to="/" className="text-cadetGray">
          Home
        </Link>
        <BsChevronRight />
      </div>
      <div className="flex items-center gap-2 md:gap-4">
        <Link to="/shop" className="text-cadetGray">
          Shop
        </Link>
        <BsChevronRight />
      </div>
      <div className="bg-cadetGray h-9 w-0.5"></div>
      <p>{title}</p>
    </div>
  );
};

export default BreadCrumbs;

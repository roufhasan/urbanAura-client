import { Link } from "react-router-dom";
import { BsChevronRight } from "react-icons/bs";

const BreadCrumbs = ({ title }) => {
  return (
    <div className="flex items-center gap-4 bg-[#f9f1e7] px-[4%] py-8 md:gap-6 md:px-[7%]">
      <div className="flex items-center gap-2 md:gap-4">
        <Link to="/" className="text-[#9f9f9f]">
          Home
        </Link>
        <BsChevronRight />
      </div>
      <div className="flex items-center gap-2 md:gap-4">
        <Link to="/shop" className="text-[#9f9f9f]">
          Shop
        </Link>
        <BsChevronRight />
      </div>
      <div className="h-9 w-0.5 bg-[#9f9f9f]"></div>
      <p>{title}</p>
    </div>
  );
};

export default BreadCrumbs;

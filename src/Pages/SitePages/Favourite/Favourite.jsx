import { Link, useLocation } from "react-router-dom";
import PageBanner from "../../../components/PageBanner/PageBanner";
import { BsCartPlus } from "react-icons/bs";
import { BiSolidTrashAlt } from "react-icons/bi";
import image from "../../../assets/images/home/gallery-3.png";

const Favourite = () => {
  const { pathname } = useLocation();
  return (
    <section>
      <PageBanner pathname={pathname} />
      {/* Favourite Items List */}
      <div className="px-[4%] py-[72px] md:px-[7%]">
        <p className="mb-10 border-b pb-2">Favourite Items</p>
        <div className="space-y-8">
          <div className="flex w-full flex-col justify-between md:flex-row">
            <div className="flex w-full gap-x-6">
              <img
                src={image}
                alt=""
                className="h-16 w-14 min-w-16 rounded-[10px] object-cover object-center"
              />
              <div className="w-full space-y-4 md:w-fit">
                <Link to="/" className="text-lg font-medium">
                  Lolito
                </Link>
                <div className="space-y-1 md:hidden">
                  <p>$543</p>
                  <div className="flex items-center gap-2 text-sm">
                    <del className="text-[#9f9f9f]">$780</del>
                    <p>-66%</p>
                  </div>
                  <p className="text-sm text-green-600">Price dropped</p>
                </div>
                <div className="flex w-full justify-between">
                  <button>
                    <BiSolidTrashAlt className="cursor-pointer text-xl text-[#9f9f9f] transition-all hover:text-[#b88e2f]" />
                  </button>
                  <button className="bg-[#b88e2f] px-4 py-2 text-xl text-white md:hidden">
                    <BsCartPlus />
                  </button>
                </div>
              </div>
            </div>

            <div className="hidden w-full justify-between md:flex">
              <div className="space-y-1">
                <p>$543</p>
                <div className="flex items-center gap-2 text-sm">
                  <del className="text-[#9f9f9f]">$780</del>
                  <p>-66%</p>
                </div>
                <p className="text-sm text-green-600">Price dropped</p>
              </div>
              <div>
                <button className="bg-[#b88e2f] px-8 py-2 text-2xl text-white">
                  <BsCartPlus />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Favourite;

import { Link } from "react-router-dom";
import categoryImg1 from "../../../../assets/images/home/category-1.png";
import categoryImg2 from "../../../../assets/images/home/category-2.png";
import categoryImg3 from "../../../../assets/images/home/category-3.png";
import { BsArrowRight } from "react-icons/bs";

const Categories = () => {
  return (
    <section className="px-[4%] text-[#333] md:px-[10%]">
      <h1 className="mt-14 text-center text-3xl font-bold">Browse The Range</h1>
      <p className="text-center text-lg text-[#666] md:text-xl">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </p>
      {/* cards container */}
      <div className="mt-12 flex flex-col gap-6 md:flex-row">
        {/* card-1 */}
        <div className="relative">
          <img src={categoryImg1} alt="elagant white sofa with pillow" />
          <div className="absolute left-0 top-0 h-full w-full bg-black/10 md:hidden"></div>
          <div className="absolute left-8 top-12 font-medium md:left-12">
            <h3 className="mb-3 text-[34px]">Living Room</h3>
            <Link
              to="/products?category=living"
              className="group inline-flex items-center gap-1 border-b border-black pb-0.5"
            >
              Shop Now
              <span>
                <BsArrowRight
                  size={20}
                  className="transition-transform duration-300 ease-in group-hover:translate-x-1"
                />
              </span>
            </Link>
          </div>
        </div>
        {/* card-2 and card-3 container */}
        <div className="flex flex-col gap-6">
          {/* card-2 */}
          <div className="relative">
            <img src={categoryImg2} alt="elagant white sofa with pillow" />
            <div className="absolute left-0 top-0 h-full w-full bg-black/10 md:hidden"></div>
            <div className="absolute bottom-10 left-8 font-medium">
              <h3 className="mb-3 text-[34px]">Bed Room</h3>
              <Link
                to="/products?category=bedroom"
                className="group inline-flex items-center gap-1 border-b border-black pb-0.5"
              >
                Shop Now
                <span>
                  <BsArrowRight
                    size={20}
                    className="transition-transform duration-300 ease-in group-hover:translate-x-1"
                  />
                </span>
              </Link>
            </div>
          </div>
          {/* card-3 */}
          <div className="relative">
            <img src={categoryImg3} alt="elagant white sofa with pillow" />
            <div className="absolute left-0 top-0 h-full w-full bg-black/10 md:hidden"></div>
            <div className="absolute bottom-10 left-8 font-medium">
              <h3 className="mb-3 text-[34px]">Kitchen</h3>
              <Link
                to="/products?category=dining"
                className="group inline-flex items-center gap-1 border-b border-black pb-0.5"
              >
                Shop Now
                <span>
                  <BsArrowRight
                    size={20}
                    className="transition-transform duration-300 ease-in group-hover:translate-x-1"
                  />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Categories;

// images
import trophySvg from "../../assets/logo/trophy.svg";
import guaranteeSvg from "../../assets/logo/guarantee.svg";
import shippingSvg from "../../assets/logo/shipping.svg";
import supportSvg from "../../assets/logo/customer-support.svg";

const ServicesHighlight = () => {
  return (
    <section className="flex flex-col items-center gap-y-6 bg-[#FAF3EA] py-16 md:flex-row md:justify-between md:py-24 md:pl-[4%] md:pr-[7%]">
      <div className="flex w-4/5 items-center gap-[10px] md:w-auto">
        <img
          src={trophySvg}
          alt="trophy logo"
          className="size-11 md:size-[60px]"
        />
        <div>
          <h3 className="text-xl font-semibold text-[#242424] md:text-2xl">
            High Quality
          </h3>
          <p className="text-lg text-[#898989] md:text-xl">
            Crafted from top materials
          </p>
        </div>
      </div>

      <div className="flex w-4/5 items-center gap-[10px] md:w-auto">
        <img
          src={guaranteeSvg}
          alt="guarantee logo"
          className="size-11 md:size-[60px]"
        />
        <div>
          <h3 className="text-xl font-semibold text-[#242424] md:text-2xl">
            Warranty Protection
          </h3>
          <p className="text-lg text-[#898989] md:text-xl">Over 2 years</p>
        </div>
      </div>

      <div className="flex w-4/5 items-center gap-[10px] md:w-auto">
        <img
          src={shippingSvg}
          alt="shipping logo"
          className="size-11 md:size-[60px]"
        />
        <div>
          <h3 className="text-xl font-semibold text-[#242424] md:text-2xl">
            Free Shipping
          </h3>
          <p className="text-lg text-[#898989] md:text-xl">Order over 150$</p>
        </div>
      </div>

      <div className="flex w-4/5 items-center gap-[10px] md:w-auto">
        <img
          src={supportSvg}
          alt="customer-support logo"
          className="size-11 md:size-[60px]"
        />
        <div>
          <h3 className="text-xl font-semibold text-[#242424] md:text-2xl">
            24 / 7 Support
          </h3>
          <p className="text-lg text-[#898989] md:text-xl">Dedicated support</p>
        </div>
      </div>
    </section>
  );
};

export default ServicesHighlight;

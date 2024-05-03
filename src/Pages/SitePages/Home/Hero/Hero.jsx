import { Link } from "react-router-dom";
import heroImg from "../../../../assets/images/home/hero-bg.jpg";

const Hero = () => {
  return (
    <section
      style={{ backgroundImage: `url(${heroImg})` }}
      className="flex h-[calc(100vh-106px)] max-h-[716px] min-h-[470px] w-full flex-col items-start justify-evenly bg-cover bg-center bg-no-repeat text-[#333] md:items-end md:justify-center md:pr-[100px]"
    >
      <div className="bg-[#fff3e3] px-[4%] pr-14 pt-16 md:max-w-[643px] md:pl-10">
        <p className="font-semibold">New Arrival</p>
        <h1 className="mt-2 text-[35px] font-bold leading-tight text-[#b88e2f] md:text-[52px]">
          Discover Our <br />
          New Collection
        </h1>
        <p className="mt-4 text-lg font-medium">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
          tellus, luctus nec ullamcorper mattis.
        </p>
        <Link
          to="/"
          className="mb-9 mt-12 inline-block bg-[#B88E2F] px-14 py-4  font-bold uppercase text-white md:px-[72px] md:py-6"
        >
          Buy Now
        </Link>
      </div>
    </section>
  );
};

export default Hero;

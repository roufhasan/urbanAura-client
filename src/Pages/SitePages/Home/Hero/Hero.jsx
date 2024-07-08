import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import heroImg from "../../../../assets/images/home/hero-bg.jpg";

const Hero = () => {
  return (
    <section
      style={{ backgroundImage: `url(${heroImg})` }}
      className="flex h-[calc(100vh-106px)] max-h-[716px] min-h-[470px] w-full flex-col items-start justify-evenly bg-cover bg-center bg-no-repeat text-[#333] md:items-end md:justify-center md:pr-[7%]"
    >
      <div className="bg-[#fff3e3] px-[4%] pr-14 pt-16 md:max-w-[643px] md:pl-10">
        <p className="font-semibold">New Arrival</p>
        <h1 className="mt-2 text-[35px] font-bold leading-tight text-[#b88e2f] md:text-[45px] lg:text-[48px] xl:text-[52px]">
          Discover Our <br />
          New Collection
        </h1>
        <p className="mt-4 text-lg font-medium">
          Refresh your space with our latest furniture designs. Stylish,
          comfortable, and made for you.
        </p>
        <motion.button whileTap={{ scale: 0.9 }}>
          <Link
            to="/shop"
            className="mb-9 mt-12 inline-block bg-[#B88E2F] px-14 py-4  font-bold uppercase text-white md:px-16 lg:px-[68px] lg:py-5 xl:px-[72px] xl:py-6"
          >
            Buy Now
          </Link>
        </motion.button>
      </div>
    </section>
  );
};

export default Hero;

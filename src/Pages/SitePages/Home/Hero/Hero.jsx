import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import heroImg from "../../../../assets/images/home/hero-bg.jpg";

const Hero = () => {
  const fadeInUpAnimation = {
    hidden: {
      opacity: 0,
      y: 100,
    },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.3,
        duration: 1,
      },
    },
  };

  return (
    <section
      style={{
        backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.5), rgba(0,0,0,0.6)), url(${heroImg}) `,
      }}
      className="flex h-screen max-h-[800px] min-h-[470px] w-full items-center justify-center bg-cover bg-center bg-no-repeat px-[4%] text-[#333] md:px-[7%]"
    >
      <motion.div
        initial="hidden"
        animate="show"
        variants={fadeInUpAnimation}
        className="text-center"
      >
        <motion.p
          variants={fadeInUpAnimation}
          className="gradient-text mb-1 text-sm font-medium uppercase"
        >
          enlighten your home
        </motion.p>
        <motion.h3
          variants={fadeInUpAnimation}
          className="gradient-text mb-2.5 text-5xl font-semibold capitalize md:text-6xl md:font-bold"
        >
          harmony in design :
        </motion.h3>
        <motion.h3
          variants={fadeInUpAnimation}
          className="gradient-text mb-5 text-5xl font-semibold capitalize md:text-6xl md:font-bold"
        >
          blending form and function
        </motion.h3>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.2 }}
          variants={fadeInUpAnimation}
        >
          <Link
            to="/shop"
            className="gradient-text inline-block rounded-full border border-white px-4 py-0.5 text-lg font-semibold"
          >
            Shop Now
          </Link>
        </motion.button>
      </motion.div>
    </section>
  );
};

export default Hero;

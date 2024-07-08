import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const RouteButton = ({ url }) => {
  return (
    <div className="mt-8 text-center">
      <motion.button whileTap={{ scale: 0.9 }}>
        <Link
          to={url}
          className="mr-auto inline-block border border-[#B88E2F] px-20 py-3 font-semibold text-[#B88E2F] transition-all hover:bg-[#B88E2F] hover:text-white"
        >
          Show More
        </Link>
      </motion.button>
    </div>
  );
};

export default RouteButton;

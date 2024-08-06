import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const RouteButton = ({ url }) => {
  return (
    <div className="mt-8 text-center">
      <motion.button whileTap={{ scale: 0.9 }}>
        <Link
          to={url}
          className="mr-auto inline-block border border-primary px-20 py-3 font-semibold text-primary transition-all hover:bg-primary hover:text-white"
        >
          Show More
        </Link>
      </motion.button>
    </div>
  );
};

export default RouteButton;

import { Link } from "react-router-dom";

const RouteButton = ({ url }) => {
  return (
    <div className="mt-8 text-center">
      <Link
        to={url}
        className="mr-auto inline-block border border-[#B88E2F] px-20 py-3 font-semibold text-[#B88E2F]"
      >
        Show More
      </Link>
    </div>
  );
};

export default RouteButton;

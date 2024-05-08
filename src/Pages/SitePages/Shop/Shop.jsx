import { useLocation } from "react-router-dom";
import NavBanner from "../../../components/NavBanner/NavBanner";

const Shop = () => {
  const location = useLocation();

  return (
    <section>
      {/* page navigation banner */}
      <NavBanner location={location} />
    </section>
  );
};

export default Shop;

import { useLocation } from "react-router-dom";
import NavBanner from "../../../components/NavBanner/NavBanner";
import ServicesHighlight from "../../../components/ServicesHighlight/ServicesHighlight";

const Shop = () => {
  const location = useLocation();

  return (
    <section>
      {/* page navigation banner */}
      <NavBanner location={location} />
      <ServicesHighlight />
    </section>
  );
};

export default Shop;

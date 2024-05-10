import { useLocation } from "react-router-dom";
import NavBanner from "../../../components/NavBanner/NavBanner";
import ServicesHighlight from "../../../components/ServicesHighlight/ServicesHighlight";
import Products from "./Products/Products";
import SortView from "./SortView/SortView";

const Shop = () => {
  const location = useLocation();

  return (
    <section>
      {/* page navigation banner */}
      <NavBanner location={location} />
      <SortView />
      <Products />
      <ServicesHighlight />
    </section>
  );
};

export default Shop;

import { useLocation } from "react-router-dom";
import NavBanner from "../../../components/NavBanner/NavBanner";
import ServicesHighlight from "../../../components/ServicesHighlight/ServicesHighlight";
import Products from "./Products/Products";
import SortView from "./SortView/SortView";
import { useEffect, useState } from "react";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [sortedProducts, setSortedProducts] = useState(products);
  const location = useLocation();

  /* get products */
  const getProducts = async () => {
    const response = await fetch("products.json");
    const data = await response.json();
    setProducts(data);
    setSortedProducts(data);
  };

  /* handle products sorting */
  const handleSort = (e) => {
    if (e.target.value === "asc") {
      setSortedProducts([...sortedProducts].sort((a, b) => a.price - b.price));
    } else if (e.target.value === "desc") {
      setSortedProducts([...sortedProducts].sort((a, b) => b.price - a.price));
    } else {
      setSortedProducts(products);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <section>
      {/* page navigation banner */}
      <NavBanner location={location} />
      <SortView handleSort={handleSort} />
      <Products sortedProducts={sortedProducts} />
      <ServicesHighlight />
    </section>
  );
};

export default Shop;

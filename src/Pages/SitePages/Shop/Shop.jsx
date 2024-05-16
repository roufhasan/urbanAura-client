import { useLocation } from "react-router-dom";
import NavBanner from "../../../components/NavBanner/NavBanner";
import ServicesHighlight from "../../../components/ServicesHighlight/ServicesHighlight";
import Products from "./Products/Products";
import SortView from "./SortView/SortView";
import { useEffect, useState } from "react";
import axios from "axios";

const Shop = () => {
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [sortedProducts, setSortedProducts] = useState(products);
  const [gridView, setGridView] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(16);

  // products pagination start index and end index
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

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

  /* get products */
  const getProducts = () => {
    axios.get("http://localhost:5000/products").then((res) => {
      setProducts(res.data);
      setSortedProducts(res.data);
      setTotalPages(Math.ceil(res.data.length / itemsPerPage));
    });
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <section>
      {/* page navigation banner */}
      <NavBanner location={location} />
      <SortView
        endIndex={endIndex}
        handleSort={handleSort}
        itemsPerPage={itemsPerPage}
        sortedProducts={sortedProducts}
        startIndex={startIndex}
        setGridView={setGridView}
        setItemsPerPage={setItemsPerPage}
      />
      <Products
        currentPage={currentPage}
        endIndex={endIndex}
        gridView={gridView}
        itemsPerPage={itemsPerPage}
        sortedProducts={sortedProducts}
        startIndex={startIndex}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
        setTotalPages={setTotalPages}
      />
      <ServicesHighlight />
    </section>
  );
};

export default Shop;

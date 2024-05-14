import { useLocation } from "react-router-dom";
import NavBanner from "../../../components/NavBanner/NavBanner";
import ServicesHighlight from "../../../components/ServicesHighlight/ServicesHighlight";
import Products from "./Products/Products";
import SortView from "./SortView/SortView";
import { useEffect, useState } from "react";

const Shop = () => {
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [sortedProducts, setSortedProducts] = useState(products);
  const [gridView, setGridView] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const prevDisabled = currentPage === 1;
  const nextDisabled = currentPage === totalPages;

  const itemsPerPage = 16;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const itemsToDisplay = sortedProducts.slice(startIndex, endIndex);

  const handlePrevClick = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  /* get products */
  const getProducts = async () => {
    const response = await fetch("products.json");
    const data = await response.json();
    setProducts(data);
    setSortedProducts(data);
    setTotalPages(Math.ceil(data.length / 16));
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
      <SortView handleSort={handleSort} setGridView={setGridView} />
      <Products
        gridView={gridView}
        itemsToDisplay={itemsToDisplay}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
      />
      <ServicesHighlight />
    </section>
  );
};

export default Shop;

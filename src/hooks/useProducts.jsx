import axios from "axios";
import { useEffect, useState } from "react";

const useProducts = (initialUrl) => {
  const [products, setProducts] = useState([]);
  const [sortedProducts, setSortedProducts] = useState(products);
  const [loading, setLoading] = useState(true);
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

  const url = initialUrl
    ? `http://localhost:5000/products${initialUrl}`
    : `http://localhost:5000/products`;

  /* get products */
  const getProducts = () => {
    axios.get(url).then((res) => {
      setLoading(false);
      setProducts(res.data);
      setSortedProducts(res.data);
      setTotalPages(Math.ceil(res.data.length / itemsPerPage));
    });
  };

  useEffect(() => {
    getProducts();
  }, [initialUrl]);

  return {
    endIndex,
    handleSort,
    itemsPerPage,
    sortedProducts,
    startIndex,
    setGridView,
    setItemsPerPage,
    currentPage,
    gridView,
    loading,
    totalPages,
    setCurrentPage,
    setTotalPages,
  };
};

export default useProducts;

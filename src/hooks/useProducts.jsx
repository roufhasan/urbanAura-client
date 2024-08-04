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

  const url = initialUrl
    ? `https://urbanaura-server.up.railway.app/products${initialUrl}`
    : `https://urbanaura-server.up.railway.app/products`;

  /* get products */
  const getProducts = (url) => {
    axios.get(url).then((res) => {
      setLoading(false);
      setProducts(res.data);
      setSortedProducts(res.data);
      setTotalPages(Math.ceil(res.data.length / itemsPerPage));
    });
  };

  /* handle products sorting */
  const handleSort = (e) => {
    const sortType = e.target.value;

    setSortedProducts(
      [...products].sort((a, b) => {
        const priceA = a.price.discounted
          ? a.price.discounted
          : a.price.original;
        const priceB = b.price.discounted
          ? b.price.discounted
          : b.price.original;

        if (sortType === "priceAsc") {
          return priceA - priceB;
        } else if (sortType === "priceDesc") {
          return priceB - priceA;
        } else if (sortType === "desc") {
          getProducts(
            "https://urbanaura-server.up.railway.app/products?sortBy=desc",
          );
        } else if (sortType === "asc") {
          getProducts(
            "https://urbanaura-server.up.railway.app/products?sortBy=asc",
          );
        } else {
          return 0;
        }
      }),
    );
  };

  useEffect(() => {
    getProducts(url);
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

import { useLocation } from "react-router-dom";
import NavBanner from "../../../components/NavBanner/NavBanner";
import ServicesHighlight from "../../../components/ServicesHighlight/ServicesHighlight";
import ProductsPagination from "./Products/ProductsPagination";
import SortView from "./SortView/SortView";
import useProducts from "../../../hooks/useProducts";

const Shop = () => {
  const { pathname } = useLocation();
  const {
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
  } = useProducts();

  return (
    <section>
      {/* page navigation banner */}
      <NavBanner pathname={pathname} />
      <SortView
        {...{
          endIndex,
          handleSort,
          itemsPerPage,
          sortedProducts,
          startIndex,
          setGridView,
          setItemsPerPage,
        }}
      />
      <ProductsPagination
        {...{
          currentPage,
          endIndex,
          gridView,
          itemsPerPage,
          loading,
          sortedProducts,
          startIndex,
          totalPages,
          setCurrentPage,
          setTotalPages,
        }}
      />
      <ServicesHighlight />
    </section>
  );
};

export default Shop;

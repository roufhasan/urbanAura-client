import { useLocation } from "react-router-dom";
import PageBanner from "../../../components/PageBanner/PageBanner";
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
      <PageBanner pathname={pathname} />

      {/* Props for SortView component:
          - Pagination data: startIndex, endIndex, itemsPerPage, setItemsPerPage
          - Sorting: sortedProducts, handleSort
          - View state: setGridView
      */}
      <SortView
        {...{
          startIndex,
          endIndex,
          itemsPerPage,
          setItemsPerPage,
          sortedProducts,
          handleSort,
          setGridView,
        }}
      />

      {/* Props for ProductsPagination component:
          - Pagination state: currentPage, totalPages, setCurrentPage, setTotalPages
          - Product data: sortedProducts, itemsPerPage, startIndex, endIndex
          - View state: gridView, loading 
      */}
      <ProductsPagination
        {...{
          currentPage,
          totalPages,
          setCurrentPage,
          setTotalPages,
          sortedProducts,
          itemsPerPage,
          startIndex,
          endIndex,
          gridView,
          loading,
        }}
      />
      <ServicesHighlight />
    </section>
  );
};

export default Shop;

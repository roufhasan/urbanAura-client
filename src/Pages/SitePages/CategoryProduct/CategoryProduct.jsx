import { useLocation } from "react-router-dom";
import PageBanner from "../../../components/PageBanner/PageBanner";
import SortView from "../Shop/SortView/SortView";
import ServicesHighlight from "../../../components/ServicesHighlight/ServicesHighlight";
import ProductsPagination from "../Shop/Products/ProductsPagination";
import useProducts from "../../../hooks/useProducts";

const Shop = () => {
  const { pathname, search } = useLocation();
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
  } = useProducts(search);

  return (
    <section>
      {/* page navigation banner */}
      <PageBanner pathname={pathname} />
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

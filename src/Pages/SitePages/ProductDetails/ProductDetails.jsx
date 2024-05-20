import { useLoaderData } from "react-router-dom";
import BreadCrumbs from "./BreadCrumbs/BreadCrumbs";
import ProductOverview from "./ProductOverview/ProductOverview";
import ProductTabs from "./ProductTabs/ProductTabs";

const ProductDetails = () => {
  const product = useLoaderData();
  const { title } = product;

  return (
    <section>
      <BreadCrumbs title={title} />
      <div className="px-[4%] md:px-[7%]">
        <ProductOverview product={product} />
      </div>
      <div className="border-y border-[#d9d9d9] px-[4%] md:px-[7%]">
        <ProductTabs />
      </div>
    </section>
  );
};

export default ProductDetails;

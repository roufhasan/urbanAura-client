import { useLoaderData } from "react-router-dom";
import BreadCrumbs from "./BreadCrumbs/BreadCrumbs";
import ProductOverview from "./ProductOverview/ProductOverview";
import ProductTabs from "./ProductTabs/ProductTabs";
import RelatedProducts from "./RelatedProducts/RelatedProducts";

const ProductDetails = () => {
  const product = useLoaderData();
  const { title, category } = product;

  return (
    <section>
      <BreadCrumbs title={title} />
      <div className="px-[4%] md:px-[7%]">
        <ProductOverview product={product} />
        <div className="border-y border-[#d9d9d9] pb-16">
          <ProductTabs />
        </div>
        <RelatedProducts category={category} />
      </div>
    </section>
  );
};

export default ProductDetails;

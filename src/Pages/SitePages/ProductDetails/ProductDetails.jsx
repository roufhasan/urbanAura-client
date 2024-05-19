import { useLoaderData } from "react-router-dom";
import BreadCrumbs from "./BreadCrumbs/BreadCrumbs";
import ProductOverview from "./ProductOverview/ProductOverview";

const ProductDetails = () => {
  const product = useLoaderData();
  const { title } = product;

  return (
    <section>
      <BreadCrumbs title={title} />
      <div className="border-b border-[#d9d9d9] px-[4%] pb-16 pt-8 md:px-[7%]">
        <ProductOverview />
      </div>
    </section>
  );
};

export default ProductDetails;

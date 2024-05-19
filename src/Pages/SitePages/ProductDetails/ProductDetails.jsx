import { useLoaderData } from "react-router-dom";
import BreadCrumbs from "./BreadCrumbs/BreadCrumbs";
import ProductOverview from "./ProductOverview/ProductOverview";

const ProductDetails = () => {
  const product = useLoaderData();
  const { title } = product;
  console.log(product);

  return (
    <section>
      <BreadCrumbs title={title} />
      <div className="px-[4%] pt-8 md:px-[7%]">
        <ProductOverview />
      </div>
    </section>
  );
};

export default ProductDetails;

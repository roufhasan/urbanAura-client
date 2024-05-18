import { useLoaderData } from "react-router-dom";
import BreadCrumbs from "./BreadCrumbs/BreadCrumbs";

const ProductDetails = () => {
  const product = useLoaderData();
  const { title } = product;
  console.log(product);

  return (
    <section>
      <BreadCrumbs title={title} />
    </section>
  );
};

export default ProductDetails;

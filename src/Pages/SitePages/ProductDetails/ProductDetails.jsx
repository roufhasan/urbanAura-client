import { useLoaderData } from "react-router-dom";
import BreadCrumbs from "./BreadCrumbs/BreadCrumbs";
import ProductOverview from "./ProductOverview/ProductOverview";
import ProductTabs from "./ProductTabs/ProductTabs";
import RelatedProducts from "./RelatedProducts/RelatedProducts";
import { useEffect, useState } from "react";
import axios from "axios";

const ProductDetails = () => {
  const product = useLoaderData();
  const { _id, title, category, gallery } = product;
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const reviewsResponse = await axios.get(
          "http://localhost:5000/reviews",
          {
            params: { product_id: _id },
          },
        );
        setReviews(reviewsResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [_id]);

  return (
    <section>
      <BreadCrumbs title={title} />
      <div className="px-[4%] md:px-[7%]">
        <ProductOverview product={product} reviews={reviews} />
        <div className="border-y border-[#d9d9d9] pb-16">
          <ProductTabs
            gallery={gallery}
            productId={_id}
            reviews={reviews}
            setReviews={setReviews}
          />
        </div>
        <RelatedProducts category={category} />
      </div>
    </section>
  );
};

export default ProductDetails;

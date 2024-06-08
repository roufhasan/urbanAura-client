import { useEffect, useState } from "react";
import axios from "axios";
import SkeletonLoader from "../../../../components/SkeletonLoader/SkeletonLoader";
import Card from "../../../../components/Card/Card";
import RouteButton from "../../../../components/Buttons/RouteButton";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const getProducts = () => {
    axios
      .get("http://localhost:5000/products")
      .then((res) => {
        setLoading(false);
        setProducts(res.data);
      })
      .then((err) => {
        setLoading(false);
        console.error(err);
      });
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <section className="mb-16 mt-14 px-[4%] text-[#3A3A3A] md:px-[7%]">
      {/* Section Title */}
      <h1 className="mb-8 text-center text-3xl font-bold md:text-[40px]">
        Our Products
      </h1>

      {/* Products */}
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-8">
        {loading && <SkeletonLoader />}
        {!loading &&
          products &&
          products.length > 0 &&
          products
            .slice(0, 8)
            .map((product) => <Card key={product._id} product={product} />)}
      </div>

      {/* button */}
      <RouteButton url="/shop" />
    </section>
  );
};

export default Products;

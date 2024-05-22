import { useEffect, useState } from "react";
import Card from "../../../../components/Card/Card";
import { Link } from "react-router-dom";
import axios from "axios";
import SkeletonLoader from "../../../../components/SkeletonLoader/SkeletonLoader";

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
      <div className="grid gap-8 md:grid-cols-4">
        {loading && <SkeletonLoader />}
        {!loading &&
          products &&
          products.length > 0 &&
          products
            .slice(0, 8)
            .map((product) => <Card key={product._id} product={product} />)}
      </div>

      <div className="mt-8 text-center">
        <Link
          to="/shop"
          className="mr-auto inline-block border border-[#B88E2F] px-20 py-3 font-semibold text-[#B88E2F]"
        >
          Show More
        </Link>
      </div>
    </section>
  );
};

export default Products;

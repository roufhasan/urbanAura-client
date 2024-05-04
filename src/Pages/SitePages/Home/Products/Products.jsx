import { useEffect, useState } from "react";
import Card from "../../../../components/Card/Card";
import { Link } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    const res = await fetch("products.json");
    const data = await res.json();
    setProducts(data);
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
        {products &&
          products.length > 0 &&
          products
            .slice(0, 8)
            .map((product) => <Card key={product.id} product={product} />)}
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

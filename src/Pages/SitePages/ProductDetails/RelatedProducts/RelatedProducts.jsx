import { useEffect, useState } from "react";
import axios from "axios";
import Card from "../../../../components/Card/Card";
import RouteButton from "../../../../components/Buttons/RouteButton";

const RelatedProducts = ({ category }) => {
  const [products, setProducts] = useState([]);

  const getRelatedProducts = () => {
    axios
      .get(`http://localhost:5000/products?category=${category}`)
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getRelatedProducts();
  }, []);

  console.log(products);

  return (
    <div className="mb-24 mt-14">
      <h1 className="mb-6 text-center text-4xl font-medium">
        Related Products
      </h1>
      {/* products container */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8 xl:grid-cols-4">
        {products && products.length > 4
          ? products
              .slice(0, 4)
              .map((product) => <Card key={product?._id} product={product} />)
          : products.map((product) => (
              <Card key={product?._id} product={product} />
            ))}
      </div>
      {/* button */}
      <RouteButton url={`/products?category=${category}`} />
    </div>
  );
};

export default RelatedProducts;

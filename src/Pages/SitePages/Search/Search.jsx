import { useLoaderData, useParams } from "react-router-dom";
import PageBanner from "../../../components/PageBanner/PageBanner";
import Card from "../../../components/Cards/Card/Card";

const Search = () => {
  const { key: searchValue } = useParams();
  const products = useLoaderData();

  return (
    <section>
      <PageBanner pathname="search" />
      <div className="px-[4%] py-8 md:px-[7%]">
        <p className="font-medium">
          {products.length > 0
            ? `${products.length} products found for "${searchValue}"`
            : `No products found for "${products}"`}
        </p>
        <div className="grid gap-6 py-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-10 xl:grid-cols-4">
          {products &&
            products.length > 0 &&
            products.map((product) => (
              <Card key={product._id} product={product} />
            ))}
        </div>
      </div>
    </section>
  );
};

export default Search;

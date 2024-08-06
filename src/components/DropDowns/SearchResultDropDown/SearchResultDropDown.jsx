import { Link } from "react-router-dom";
import { formatPrice } from "../../../utils/formatPrice";

const SearchResultDropDown = ({ products, clearSearch }) => {
  return (
    <div className="absolute top-[120%] z-10 w-full bg-white p-4 shadow-sm md:w-[125%]">
      <ul className="h-80 w-full space-y-6 overflow-y-auto">
        {products &&
          products.length > 0 &&
          products?.map((item) => (
            <li key={item._id}>
              <Link
                to={`/products/${item._id}`}
                onClick={clearSearch}
                className="group flex items-center gap-2 transition-all hover:text-primary"
              >
                <img
                  className="size-14 rounded"
                  src={item.thumbnail}
                  alt={item.title}
                  loading="lazy"
                />
                <div>
                  <p className="text-sm font-medium">{item.title}</p>
                  <small className="text-gray-400 group-hover:text-primary">
                    Starts from $
                    {item.price.discounted
                      ? formatPrice(item.price.discounted)
                      : formatPrice(item.price.original)}
                  </small>
                </div>
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default SearchResultDropDown;

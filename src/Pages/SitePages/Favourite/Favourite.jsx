import { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../../Providers/AuthProvider";
import { CartContext } from "../../../Providers/CartProvider";
import PageBanner from "../../../components/PageBanner/PageBanner";
import FavouriteItemList from "./FavouriteItemList/FavouriteItemList";

const Favourite = () => {
  const { pathname } = useLocation();
  const { user } = useContext(AuthContext);
  const { cart, handleCartItemSave } = useContext(CartContext);
  const [favouriteItems, setFavouriteItems] = useState([]);

  // Get favourite items of a user
  const getFavouriteItems = (email) => {
    axios
      .get("http://localhost:5000/favourite", {
        params: { userEmail: email },
      })
      .then((res) => setFavouriteItems(res.data))
      .catch((err) => {
        console.error(
          "error while fetching favourite items:",
          err.response.data.message,
        );
      });
  };

  useEffect(() => {
    if (user && user.email) {
      getFavouriteItems(user.email);
    }
  }, [user]);

  const cartItemIds = cart.map((item) => item.product_id);

  return (
    <section>
      <PageBanner pathname={pathname} />
      {/* Favourite Items List */}
      <div className="px-[4%] py-[72px] md:px-[7%]">
        {favouriteItems && favouriteItems.length > 0 && (
          <p className="mb-10 border-b pb-2">Favourite Items</p>
        )}
        {/* favourite list container */}
        <div className="space-y-8">
          {favouriteItems && favouriteItems.length > 0 ? (
            favouriteItems.map((item) => (
              <FavouriteItemList
                key={item._id}
                item={item}
                favouriteItems={favouriteItems}
                setFavouriteItems={setFavouriteItems}
                cartItemIds={cartItemIds}
                handleCartItemSave={handleCartItemSave}
                user={user}
              />
            ))
          ) : (
            <div className="text-center">
              <h1 className="mb-2 text-2xl font-medium">
                You have not added any favourite products yet.
              </h1>
              <div className="text-[#9f9f9f]">
                <Link to="/shop" className="text-[#b88e2f]">
                  Browse our catalog
                </Link>{" "}
                and add your favourite items to see them here.
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Favourite;

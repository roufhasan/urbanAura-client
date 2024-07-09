import { useContext, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";
import { AuthContext } from "../../../Providers/AuthProvider";
import { CartContext } from "../../../Providers/CartProvider";
import { FavouriteContext } from "../../../Providers/FavouriteProvider";
import PageBanner from "../../../components/PageBanner/PageBanner";
import FavouriteItemList from "./FavouriteItemList/FavouriteItemList";

const Favourite = () => {
  const { pathname } = useLocation();
  const { user } = useContext(AuthContext);
  const { cart, handleCartItemSave } = useContext(CartContext);
  const { favouriteItems, getFavouriteItems, deleteFavouriteItem } =
    useContext(FavouriteContext);

  useEffect(() => {
    getFavouriteItems();
  }, [getFavouriteItems]);

  const cartItemIds = cart.map((item) => item.product_id);

  return (
    <section>
      <Helmet>
        <title>Favourites - UrbanAura Furniture</title>
      </Helmet>
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
                deleteFavouriteItem={deleteFavouriteItem}
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

import { createContext, useCallback, useContext, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { AuthContext } from "./AuthProvider";

export const FavouriteContext = createContext(null);

const FavouriteProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [favouriteItems, setFavouriteItems] = useState([]);
  const [refetch, setRefetch] = useState(false);

  // Get favourite items of a user
  const getFavouriteItems = useCallback(() => {
    if (user && user.email) {
      axios
        .get("http://localhost:5000/favourite", {
          params: { userEmail: user.email },
        })
        .then((res) => {
          setFavouriteItems(res.data);
          setRefetch(!refetch);
        })
        .catch((err) => {
          console.error(
            "error while fetching favourite items:",
            err.response.data.message,
          );
        });
    }
  }, [user, refetch]);

  // Save a new favourite item
  const addToFavourite = (_id, title, price, thumbnail) => {
    if (!user) {
      return toast.error("Please login to add your favourite item!");
    }

    axios
      .post("http://localhost:5000/favourite", {
        user_email: user.email,
        product_id: _id,
        title,
        price,
        thumbnail,
        quantity: 1,
        size: "l",
        color: "#816dfa",
      })
      .then((res) => {
        console.log(res);
        if (res.data.message) {
          return toast.success("Item already in favourites!");
        }
        if (res.data.acknowledged) {
          return toast.success("Item added to favourite!");
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error(err.message);
      });
  };

  // Delete a favourite a item
  const deleteFavouriteItem = (id) => {
    axios
      .delete("http://localhost:5000/favourite", { data: { id: id } })
      .then((res) => {
        console.log(res);
        if (res.data.acknowledged && res.data.deletedCount > 0) {
          toast.success("Favourite item removed");
          setFavouriteItems(
            favouriteItems.filter((favItem) => favItem._id !== id),
          );
        }
      })
      .catch((err) => {
        console.error(err.message);
        toast.error("Something went wrong!");
      });
  };

  const favouriteInfo = {
    favouriteItems,
    setFavouriteItems,
    getFavouriteItems,
    addToFavourite,
    deleteFavouriteItem,
  };

  return (
    <FavouriteContext.Provider value={favouriteInfo}>
      {children}
    </FavouriteContext.Provider>
  );
};

export default FavouriteProvider;

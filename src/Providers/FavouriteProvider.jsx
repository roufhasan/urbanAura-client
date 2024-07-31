import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { AuthContext } from "./AuthProvider";
import useAxiosSecure from "../hooks/useAxiosSecure";

export const FavouriteContext = createContext(null);

const FavouriteProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const { axiosSecure } = useAxiosSecure();
  const [favouriteItems, setFavouriteItems] = useState([]);

  // Get favourite items of a user
  const getFavouriteItems = useCallback(async () => {
    if (user && user.email) {
      // Retry up to 3 times
      for (let i = 0; i < 3; i++) {
        const token = localStorage.getItem("access-token");
        if (token) {
          try {
            const response = await axiosSecure.get("/favourite", {
              params: { userEmail: user.email },
            });
            setFavouriteItems(response.data);
            return;
          } catch (err) {
            console.log(
              "Error while fetching favourite items:",
              err.response?.data?.message || err.message,
            );
            if (i === 2) {
              // If the last retry failed
              console.log(
                "Failed to fetch favourite items after multiple attempts",
              );
            }
          }
        } else {
          await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait before retry
        }
      }
    }
  }, [user, axiosSecure]);

  useEffect(() => {
    getFavouriteItems();
  }, [getFavouriteItems]);

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
        if (res.data.message) {
          return toast.success("Item already in favourites!");
        }
        if (res.data.acknowledged) {
          setFavouriteItems((prevItems) => [
            ...prevItems,
            { product_id: _id, title, price, thumbnail },
          ]);
          return toast.success("Item added to favourite!");
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error(err.message);
      });
  };

  // Delete a favourite a item
  const deleteFavouriteItem = (product_id, user_email) => {
    axios
      .delete("http://localhost:5000/favourite", {
        data: { product_id: product_id, user_email: user_email },
      })
      .then((res) => {
        if (res.data.acknowledged && res.data.deletedCount > 0) {
          toast.success("Favourite item removed");
          setFavouriteItems(
            favouriteItems.filter(
              (favItem) => favItem.product_id !== product_id,
            ),
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

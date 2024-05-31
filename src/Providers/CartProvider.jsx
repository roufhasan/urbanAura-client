import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { AuthContext } from "./AuthProvider";

export const CartContext = createContext(null);

const CartProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [cart, setCart] = useState([]);
  const [refetch, setRefetch] = useState(false);

  const handleAddToCart = (item, setIsOpen) => {
    axios
      .post("http://localhost:5000/cart", item)
      .then((res) => {
        if (res.data.acknowledged) {
          setIsOpen(false);
          toast.success("Added to cart!");
        }
      })
      .catch((err) => {
        setIsOpen(false);
        toast.error("Something went wrong!");
        console.error(err);
      });
    setRefetch(!refetch);
  };

  const cartInfo = {
    cart,
    setCart,
    handleAddToCart,
  };

  useEffect(() => {
    {
      user &&
        axios
          .get("http://localhost:5000/cart", {
            params: { userEmail: user?.email },
          })
          .then((res) => {
            setCart(res.data);
          })
          .catch((err) => {
            console.error(
              "error while fetching cart data:",
              err.response.data.message,
            );
          });
    }
  }, [user, refetch]);

  return (
    <CartContext.Provider value={cartInfo}>{children}</CartContext.Provider>
  );
};

export default CartProvider;

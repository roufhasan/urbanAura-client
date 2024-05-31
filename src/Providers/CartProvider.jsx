import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthProvider";

export const CartContext = createContext(null);

const CartProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [cart, setCart] = useState([]);

  const cartInfo = {
    cart,
    setCart,
  };

  useEffect(() => {
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
  }, [user]);

  return (
    <CartContext.Provider value={cartInfo}>{children}</CartContext.Provider>
  );
};

export default CartProvider;

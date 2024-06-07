import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { AuthContext } from "./AuthProvider";

export const CartContext = createContext(null);

const CartProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [cart, setCart] = useState([]);
  const [refetch, setRefetch] = useState(false);
  const [cartLoading, setCartLoading] = useState(false);

  // Add a item to the cart or update the quantity if exists
  const handleCartItemSave = (item, setIsOpen) => {
    axios
      .put("http://localhost:5000/cart", item)
      .then((res) => {
        if (res.data.acknowledged) {
          toast.success("Added to cart!");
          setRefetch(!refetch);
          // add to cart modal hide
          if (setIsOpen) {
            setIsOpen(false);
          }
        }
      })
      .catch((err) => {
        toast.error("Something went wrong!");
        console.error(err);
        // add to cart modal hide
        if (setIsOpen) {
          setIsOpen(false);
        }
      });
  };

  // Update cart item quantity
  const handleQuantity = (quantity, id) => {
    setCartLoading(true);

    axios
      .patch("http://localhost:5000/cart_quantity", {
        id,
        user_email: user.email,
        quantity,
      })
      .then((res) => {
        if (res.data.acknowledged && res.data.matchedCount > 0) {
          setCartLoading(false);
          setRefetch(!refetch);
        }
      })
      .catch((err) => {
        setCartLoading(false);
        toast.error("Something went wrong!");
        console.error(err.message);
      });
  };

  // Delete a item from the cart
  const handleCartItemDel = (id) => {
    if (user && id) {
      axios
        .delete("http://localhost:5000/cart", {
          data: { id, email: user.email },
        })
        .then((res) => {
          if (res.data.acknowledged && res.data.deletedCount > 0) {
            toast.success("Item removed from cart");
            setRefetch(!refetch);
          }
        })
        .catch((err) => {
          console.error(err.message);
          toast.error("Something went wrong!");
        });
    }
  };

  useEffect(() => {
    // get a user cart data
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

  const cartInfo = {
    cart,
    setCart,
    cartLoading,
    setCartLoading,
    handleCartItemSave,
    handleQuantity,
    handleCartItemDel,
  };

  return (
    <CartContext.Provider value={cartInfo}>{children}</CartContext.Provider>
  );
};

export default CartProvider;

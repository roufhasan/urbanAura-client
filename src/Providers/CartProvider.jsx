import { createContext, useEffect, useCallback, useState } from "react";
import toast from "react-hot-toast";
import useAxiosSecure from "../hooks/useAxiosSecure";
import axios from "axios";
import useAuth from "../hooks/useAuth";

export const CartContext = createContext(null);

const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const { axiosSecure } = useAxiosSecure();
  const [cart, setCart] = useState([]);
  const [cartLoading, setCartLoading] = useState(false);

  // Get Cart Items
  const getCartItems = useCallback(async () => {
    if (user && user.email) {
      // Retry up to 3 times
      for (let i = 0; i < 3; i++) {
        const token = localStorage.getItem("access-token");
        if (token) {
          try {
            const response = await axiosSecure.get("/cart", {
              params: { userEmail: user.email },
            });
            setCart(response.data);
            return;
          } catch (error) {
            console.log(
              "Error while fetching cart data:",
              error.response?.data?.message || error.message,
            );
            if (i === 2) {
              // If the last retry failed
              console.log("Failed to fetch cart data after multiple attempts");
            }
          }
        } else {
          await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait before retry
        }
      }
    }
  }, [user, axiosSecure]);

  useEffect(() => {
    getCartItems();
  }, [getCartItems]);

  // Add a item to the cart or update the quantity if exists
  const handleCartItemSave = (item, setIsOpen) => {
    axios
      .put("http://localhost:5000/cart", item)
      .then((res) => {
        if (res.data.acknowledged) {
          toast.success("Added to cart!");
          setCart((prevCartItems) => [item, ...prevCartItems]);
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
  const handleQuantity = (quantity, product_id) => {
    setCartLoading(true);

    axios
      .patch("http://localhost:5000/cart_quantity", {
        product_id,
        user_email: user.email,
        quantity,
      })
      .then((res) => {
        if (res.data.acknowledged && res.data.matchedCount > 0) {
          setCartLoading(false);
          const product = cart.find(
            (item) =>
              item.product_id === product_id && item.user_email === user.email,
          );
          product.quantity = quantity;
        }
      })
      .catch((err) => {
        setCartLoading(false);
        toast.error("Something went wrong!");
        console.error(err.message);
      });
  };

  // Delete a item from the cart
  const handleCartItemDel = (product_id) => {
    if (user && product_id) {
      axios
        .delete("http://localhost:5000/cart", {
          data: { product_id, email: user.email },
        })
        .then((res) => {
          if (res.data.acknowledged && res.data.deletedCount > 0) {
            toast.success("Item removed from cart");
            setCart(cart.filter((item) => item.product_id !== product_id));
          }
        })
        .catch((err) => {
          console.error(err.message);
          toast.error("Something went wrong!");
        });
    }
  };

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

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./Routes/Routes";
import AuthProvider from "./Providers/AuthProvider";
import { Toaster } from "react-hot-toast";
import CartProvider from "./Providers/CartProvider";
import FavouriteProvider from "./Providers/FavouriteProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <CartProvider>
        <FavouriteProvider>
          <RouterProvider router={router} />
          <Toaster />
        </FavouriteProvider>
      </CartProvider>
    </AuthProvider>
  </React.StrictMode>,
);

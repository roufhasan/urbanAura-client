import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import Home from "../Pages/SitePages/Home/Home";
import Shop from "../Pages/SitePages/Shop/Shop";
import Contact from "../Pages/SitePages/Contact/Contact";
import ProductDetails from "../Pages/SitePages/ProductDetails/ProductDetails";
import CategoryProduct from "../Pages/SitePages/CategoryProduct/CategoryProduct";
import Login from "../Pages/SitePages/Login/Login";
import Signup from "../Pages/SitePages/Signup/Signup";
import Cart from "../Pages/SitePages/Cart/Cart";
import Favourite from "../Pages/SitePages/Favourite/Favourite";
import Checkout from "../Pages/SitePages/Checkout/Checkout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/shop",
        element: <Shop />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/products/:id",
        element: <ProductDetails />,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/products/${params.id}`),
      },
      {
        path: "/products",
        element: <CategoryProduct />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "favourite",
        element: <Favourite />,
      },
      {
        path: "/checkout",
        element: <Checkout />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
]);

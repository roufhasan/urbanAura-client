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
import Search from "../Pages/SitePages/Search/Search";
import Checkout from "../Pages/SitePages/Checkout/Checkout";
import PrivateRoute from "./PrivateRoute";
import MyOrders from "../Pages/DashBoard/UserDashboard/MyOrders/MyOrders";
import AccountSettings from "../Pages/DashBoard/UserDashboard/AccountSettings/AccountSettings";
import ErrorPage from "../Pages/SitePages/ErrorPage/ErrorPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <ErrorPage />,
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
          fetch(
            `https://urbanaura-server.up.railway.app/products/${params.id}`,
          ),
      },
      {
        path: "/products",
        element: <CategoryProduct />,
      },
      {
        path: "/search/:key",
        element: <Search />,
        loader: ({ params }) =>
          fetch(`https://urbanaura-server.up.railway.app/search/${params.key}`),
      },
      {
        path: "/cart",
        element: (
          <PrivateRoute>
            <Cart />
          </PrivateRoute>
        ),
      },
      {
        path: "favourite",
        element: (
          <PrivateRoute>
            <Favourite />
          </PrivateRoute>
        ),
      },
      {
        path: "/checkout",
        element: (
          <PrivateRoute>
            <Checkout />
          </PrivateRoute>
        ),
      },
      // User Dashboard Routes
      {
        path: "/my-orders",
        element: (
          <PrivateRoute>
            <MyOrders />
          </PrivateRoute>
        ),
      },
      {
        path: "/account-settings",
        element: (
          <PrivateRoute>
            <AccountSettings />
          </PrivateRoute>
        ),
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

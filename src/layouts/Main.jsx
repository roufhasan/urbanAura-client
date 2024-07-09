import { Outlet, ScrollRestoration } from "react-router-dom";
import { Helmet } from "react-helmet";
import Footer from "../components/Shared/Footer/Footer";
import Navbar from "../components/Shared/Navbar/Navbar";

const Main = () => {
  return (
    <div className="mx-auto w-full max-w-[1440px] font-Poppins">
      <Helmet>
        <title>UrbanAura Furniture</title>
      </Helmet>
      <ScrollRestoration />
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Main;

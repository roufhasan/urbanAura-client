import { Outlet } from "react-router-dom";
import Footer from "../components/Shared/Footer/Footer";
import Navbar from "../components/Shared/Navbar/Navbar";

const Main = () => {
  return (
    <div className="mx-auto w-full max-w-[1440px] font-Poppins">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Main;

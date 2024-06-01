import { useLocation } from "react-router-dom";
import NavBanner from "../../../components/NavBanner/NavBanner";
import ServicesHighlight from "../../../components/ServicesHighlight/ServicesHighlight";
import CartDetails from "./CartDetails/CartDetails";

const Cart = () => {
  const { pathname } = useLocation();

  return (
    <section>
      <NavBanner pathname={pathname} />
      <CartDetails />
      <ServicesHighlight />
    </section>
  );
};

export default Cart;

import { useLocation } from "react-router-dom";
import PageBanner from "../../../components/PageBanner/PageBanner";
import ServicesHighlight from "../../../components/ServicesHighlight/ServicesHighlight";
import CartDetails from "./CartDetails/CartDetails";

const Cart = () => {
  const { pathname } = useLocation();

  return (
    <section>
      <PageBanner pathname={pathname} />
      <CartDetails />
      <ServicesHighlight />
    </section>
  );
};

export default Cart;

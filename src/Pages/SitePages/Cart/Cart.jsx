import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";
import PageBanner from "../../../components/PageBanner/PageBanner";
import ServicesHighlight from "../../../components/ServicesHighlight/ServicesHighlight";
import CartDetails from "./CartDetails/CartDetails";

const Cart = () => {
  const { pathname } = useLocation();

  return (
    <section>
      <Helmet>
        <title>Cart - UrbanAura Furniture</title>
      </Helmet>
      <PageBanner pathname={pathname} />
      <CartDetails />
      <ServicesHighlight />
    </section>
  );
};

export default Cart;

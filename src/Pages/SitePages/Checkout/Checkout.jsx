import { useLocation } from "react-router-dom";
import PageBanner from "../../../components/PageBanner/PageBanner";
import BillingDetails from "./BillingDetails/BillingDetails";
import ServicesHighlight from "../../../components/ServicesHighlight/ServicesHighlight";
import { Helmet } from "react-helmet";

const Checkout = () => {
  const { pathname } = useLocation();

  return (
    <section>
      <Helmet>
        <title>Checkout - UrbanAura Furniture</title>
      </Helmet>
      <PageBanner pathname={pathname} />
      <BillingDetails />
      <ServicesHighlight />
    </section>
  );
};

export default Checkout;

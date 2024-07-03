import { useLocation } from "react-router-dom";
import PageBanner from "../../../components/PageBanner/PageBanner";
import BillingDetails from "./BillingDetails/BillingDetails";
import ServicesHighlight from "../../../components/ServicesHighlight/ServicesHighlight";

const Checkout = () => {
  const { pathname } = useLocation();

  return (
    <section>
      <PageBanner pathname={pathname} />
      <BillingDetails />
      <ServicesHighlight />
    </section>
  );
};

export default Checkout;

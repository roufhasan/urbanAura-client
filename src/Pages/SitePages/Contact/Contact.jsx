import { useLocation } from "react-router-dom";
import NavBanner from "../../../components/NavBanner/NavBanner";

const Contact = () => {
  const location = useLocation();
  return (
    <section>
      <NavBanner location={location} />
    </section>
  );
};

export default Contact;

import { useLocation } from "react-router-dom";
import PageBanner from "../../../components/PageBanner/PageBanner";
import image from "../../../assets/images/home/gallery-3.png";

const Favourite = () => {
  const { pathname } = useLocation();
  return (
    <section>
      <PageBanner pathname={pathname} />
      {/* Favourite Items List */}
    </section>
  );
};

export default Favourite;

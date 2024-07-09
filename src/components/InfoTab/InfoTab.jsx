import { productDetails } from "../../assets/data/productDetails";
import InfoSection from "../InfoSection/InfoSection";
import "./infoTab.css";

const InfoTab = () => {
  return (
    <div className="space-y-10">
      <InfoSection
        title="Product Specifications"
        details={productDetails.specifications}
      />

      <InfoSection title="Features" details={productDetails.features} />

      <InfoSection
        title="Care Instructions"
        details={productDetails.instructions}
      />

      <InfoSection
        title="Shipping and Returns"
        details={productDetails.shipping}
      />
    </div>
  );
};

export default InfoTab;

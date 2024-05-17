import { useLocation } from "react-router-dom";
import NavBanner from "../../../components/NavBanner/NavBanner";
import ContactDetails from "./ContactDetails/ContactDetails";

const Contact = () => {
  const location = useLocation();
  return (
    <section>
      <NavBanner location={location} />

      <div className="px-[4%] pb-12 pt-20 md:px-[7%] md:pb-16 md:pt-24">
        {/* Cotact title */}
        <div className="mb-16 text-center md:mb-32">
          <h1 className="mb-2 text-balance text-3xl font-semibold md:text-4xl">
            Get In Touch With Us
          </h1>
          <p className="mx-auto max-w-[40.25rem] text-balance text-sm text-[#9f9f9f] md:text-base">
            For More Information About Our Product & Services. Please Feel Free
            To Drop Us An Email. Our Staff Always Be There To Help You Out. Do
            Not Hesitate!
          </p>
        </div>

        {/* ==> Contact details and form container <== */}
        <div>
          {/* ==> Contact details container <== */}
          <div>
            <ContactDetails />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

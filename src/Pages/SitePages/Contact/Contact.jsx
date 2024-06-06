import { useLocation } from "react-router-dom";
import PageBanner from "../../../components/PageBanner/PageBanner";
import ContactDetails from "./ContactDetails/ContactDetails";
import ContactForm from "./ContactForm/ContactForm";
import ServicesHighlight from "../../../components/ServicesHighlight/ServicesHighlight";

const Contact = () => {
  const location = useLocation();
  return (
    <section>
      <PageBanner location={location} />

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
        <div className="flex flex-col items-center gap-16 md:flex-row md:items-start md:justify-evenly">
          <ContactDetails />
          <ContactForm />
        </div>
      </div>

      <ServicesHighlight />
    </section>
  );
};

export default Contact;

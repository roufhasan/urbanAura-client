import { Link } from "react-router-dom";
import logo from "../../../assets/logo/logo.png";

const Footer = () => {
  return (
    <footer className="border-t-paleGray border-t px-[4%] pt-12  md:px-[7%]">
      <div className="border-b-paleGray justify-between gap-10 border-b pb-12 text-center md:flex md:text-left">
        <div>
          <Link to="/" className="mb-8 flex items-center md:mb-[50px] ">
            <img
              className="mr-0.5 w-5"
              src={logo}
              alt="urbanAura logo"
              loading="lazy"
            />
            <h2 className="text-2xl font-bold">rbanAura.</h2>
          </Link>
          <p className="text-cadetGray mx-auto max-w-72 md:mx-0">
            400 University Drive Suite 200 Coral Gables, <br />
            FL 33134 USA
          </p>
        </div>

        <div className="font-medium">
          <p className="text-cadetGray my-8 md:my-0 md:mb-[55px]">Links</p>
          <div className="flex flex-col gap-6 md:gap-[46px]">
            <Link to="/home">Home</Link>
            <Link to="/shop">Shop</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
          </div>
        </div>

        <div className="font-medium">
          <p className="text-cadetGray my-8 md:my-0 md:mb-[55px]">Help</p>
          <div className="flex flex-col gap-6 md:gap-[46px]">
            <Link to="/">Payment Options</Link>
            <Link to="/">Returns</Link>
            <Link to="/">Privacy Policies</Link>
          </div>
        </div>

        <div className="font-medium">
          <p className="text-cadetGray my-8 md:my-0 md:mb-[55px]">Newsletter</p>
          <form className="text-sm md:flex md:items-start">
            <input
              className="text-cadetGray mx-auto w-[80%] border-b border-b-black py-1 pr-7 text-center outline-none focus:border-b-2 md:mx-0 md:w-full md:text-left"
              type="email"
              name="email"
              id="footer_email"
              placeholder="Enter Your Email Address"
            />
            <button className="mt-3 border-b border-b-black py-1 font-medium uppercase md:ml-3 md:mt-0 md:py-[5px]">
              subscribe
            </button>
          </form>
        </div>
      </div>

      <p className="pb-[38px] pt-[35px] text-center md:text-left">
        2024 UrabanAura. All rights reverved
      </p>
    </footer>
  );
};

export default Footer;

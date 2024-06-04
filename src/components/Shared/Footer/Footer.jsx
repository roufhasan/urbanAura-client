import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-t-[#D9D9D9] px-[4%] pt-12  md:px-[7%]">
      <div className="justify-between gap-10 border-b border-b-[#D9D9D9] pb-12 text-center md:flex md:text-left">
        <div>
          <h2 className="mb-8 text-2xl font-bold md:mb-[50px]">UrbanAura.</h2>
          <p className="mx-auto max-w-72 text-[#9F9F9F] md:mx-0">
            400 University Drive Suite 200 Coral Gables, <br />
            FL 33134 USA
          </p>
        </div>

        <div className="font-medium">
          <p className="my-8 text-[#9F9F9F] md:my-0 md:mb-[55px]">Links</p>
          <div className="flex flex-col gap-6 md:gap-[46px]">
            <Link to="/home">Home</Link>
            <Link to="/shop">Shop</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
          </div>
        </div>

        <div className="font-medium">
          <p className="my-8 text-[#9F9F9F] md:my-0 md:mb-[55px]">Help</p>
          <div className="flex flex-col gap-6 md:gap-[46px]">
            <Link to="/">Payment Options</Link>
            <Link to="/">Returns</Link>
            <Link to="/">Privacy Policies</Link>
          </div>
        </div>

        <div className="font-medium">
          <p className="my-8 text-[#9F9F9F] md:my-0 md:mb-[55px]">Newsletter</p>
          <form className="text-sm md:flex md:items-start">
            <input
              className="mx-auto w-[80%] border-b border-b-black py-1 pr-7 text-center text-[#9F9F9F] outline-none focus:border-b-2 md:mx-0 md:w-full md:text-left"
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
        2023 furino. All rights reverved
      </p>
    </footer>
  );
};

export default Footer;

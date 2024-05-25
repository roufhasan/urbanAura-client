import { Link } from "react-router-dom";
/* images */
import logo from "../../../assets/logo/logo.png";
import signupImg from "../../../assets/images/authentication/signup.jpg";

const Signup = () => {
  return (
    <section className="mx-auto h-full max-h-[1080px] min-h-screen w-full max-w-[1440px] grid-cols-12 px-[4%] py-10 font-Poppins md:grid md:px-[7%]">
      {/* image container */}
      <div className="hidden md:col-span-6 md:block">
        <img
          className="h-full max-h-[671px] w-full rounded-[10px] object-cover object-center"
          src={signupImg}
          alt="elegant sofa chair minimal photo"
        />
      </div>
      {/* form container */}
      <div className="col-span-full md:col-start-8">
        {/* Logo & Title */}
        <Link to="/" className="inline-flex items-center">
          <img className="w-[50px]" src={logo} alt="urbanAura logo" />
          <h1 className="-ml-1 font-Montserrat text-2xl font-bold md:text-[34px]">
            Furniro
          </h1>
        </Link>
        {/* form */}
        <div className="mt-6">
          <form>
            <h1 className="text-4xl font-semibold">Furnish Your Space</h1>
            <p className="text-xl italic text-[#9f9f9f]">Join Us Today</p>

            <label
              htmlFor="name"
              className="mb-2 mt-10 block w-full text-[#9f9f9f]"
            >
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              className="block w-full rounded-[10px] border px-3 py-2 text-lg outline-none focus:border-gray-500"
            />
            <label
              htmlFor="email"
              className="mb-2 mt-6 block w-full text-[#9f9f9f]"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="block w-full rounded-[10px] border px-3 py-2 text-lg outline-none focus:border-gray-500"
            />
            <label
              htmlFor="password"
              className="mb-2 mt-6 block w-full text-[#9f9f9f]"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="block w-full rounded-[10px] border px-3 py-2 text-lg outline-none focus:border-gray-500"
            />

            <p className="mb-8 mt-6 text-right text-sm text-[#9f9f9f]">
              Already have account?{" "}
              <Link to="/login" className="text-medium text-[#b88e2f]">
                Login
              </Link>
            </p>

            <button
              type="Submit"
              className="block w-full rounded-[10px] bg-[#b88e2f] py-2 text-xl text-white"
            >
              Sign up
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Signup;

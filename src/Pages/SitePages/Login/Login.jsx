import { Link } from "react-router-dom";
import { BsFillPeopleFill } from "react-icons/bs";
/* images */
import logo from "../../../assets/logo/logo.png";
import googleLogo from "../../../assets/logo/google-logo.png";
import authBanner from "../../../assets/images/authentication/auth-banner.jpg";

const Login = () => {
  return (
    <section className="mx-auto h-full max-h-[1080px] min-h-screen w-full max-w-[1440px] grid-cols-12 px-[4%] py-10 font-Poppins md:grid md:px-[7%]">
      {/* form container */}
      <div className="md:col-span-5">
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
            <h1 className="text-4xl font-semibold">Welcome Back</h1>
            <p className="text-xl text-[#9f9f9f]">Please enter you details</p>

            <label
              htmlFor="email"
              className="mb-2 mt-10 block w-full text-[#9f9f9f]"
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
              Forgot password
            </p>

            <button
              type="Submit"
              className="block w-full rounded-[10px] bg-[#b88e2f] py-2 text-xl text-white"
            >
              Sign in
            </button>
            <div className="mb-4 mt-8 flex items-center gap-2.5 text-[#9f9f9f]">
              <div className="h-0.5 w-full bg-[#9f9f9f]"></div>
              <p className="">OR</p>
              <div className="h-0.5 w-full bg-[#9f9f9f]"></div>
            </div>
            <button className="my-4 flex w-full items-center justify-center gap-3 rounded-[10px] border py-2 text-lg">
              <img src={googleLogo} alt="google logo" className="size-6" />
              <p>Log In With Google</p>
            </button>
            <button className="flex w-full items-center justify-center gap-3 rounded-[10px] border py-2 text-lg">
              <BsFillPeopleFill size={24} />
              <p>Log In With Demo Account</p>
            </button>
          </form>
        </div>
      </div>
      {/* image container */}
      <div className="hidden md:col-span-full md:col-start-7 md:block">
        <img
          className="h-full max-h-[671px] w-full rounded-[10px] object-cover object-center"
          src={authBanner}
          alt="elegant sofa chair minimal photo"
        />
      </div>
    </section>
  );
};

export default Login;

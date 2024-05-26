import { Link } from "react-router-dom";
import { BsFillPeopleFill } from "react-icons/bs";
import { useForm } from "react-hook-form";
/* images */
import logo from "../../../assets/logo/logo.png";
import googleLogo from "../../../assets/logo/google-logo.png";
import loginImg from "../../../assets/images/authentication/login.jpg";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

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
          <form onSubmit={handleSubmit(onSubmit)}>
            <h1 className="text-4xl font-semibold">Welcome Back</h1>
            <p className="text-xl italic text-[#9f9f9f]">Enter you details</p>

            <label
              htmlFor="email"
              className="mb-2 mt-10 block w-full text-[#9f9f9f]"
            >
              {errors.email ? (
                <span className="text-red-500">Email is required*</span>
              ) : (
                "Email"
              )}
            </label>
            <input
              className="block w-full rounded-[10px] border px-3 py-2 text-lg outline-none focus:border-gray-500"
              type="email"
              id="email"
              {...register("email", { required: true })}
            />
            <label
              htmlFor="password"
              className="mb-2 mt-6 block w-full text-[#9f9f9f]"
            >
              {errors.password ? (
                <span className="text-sm text-red-500">
                  Password must be min 8 characters & include at least one
                  uppercase and one number*
                </span>
              ) : (
                "Password"
              )}
            </label>
            <input
              className="block w-full rounded-[10px] border px-3 py-2 text-lg outline-none focus:border-gray-500"
              type="password"
              id="password"
              {...register("password", {
                required: true,
                pattern: /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/,
              })}
            />

            <p className="mb-8 mt-6 text-right text-sm text-[#9f9f9f]">
              Don&apos;t have account?{" "}
              <Link to="/signup" className="text-medium text-[#b88e2f]">
                Register
              </Link>
            </p>

            <button
              type="Submit"
              className="block w-full rounded-[10px] bg-[#b88e2f] py-2 text-xl text-white"
            >
              Log in
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
          src={loginImg}
          alt="chair with minimal flower vase"
          loading="lazy"
        />
      </div>
    </section>
  );
};

export default Login;

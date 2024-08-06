import { Link, useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { BsFillPeopleFill, BsFillPersonFill } from "react-icons/bs";
import { useForm } from "react-hook-form";
/* images */
import logo from "../../../assets/logo/logo.png";
import googleLogo from "../../../assets/logo/google-logo.png";
import loginImg from "../../../assets/images/authentication/login.jpg";
import toast from "react-hot-toast";
import useAuth from "../../../hooks/useAuth";

const Login = () => {
  const { signIn, googleSignIn, loading, setLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  // React hook form
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  // Form Submit handler
  const onSubmit = (data) => {
    signIn(data.email, data.password)
      .then((result) => {
        setLoading(false);
        const loggedUser = result.user;
        if (loggedUser) {
          toast.success("Welcome back!");
          navigate(from, { replace: true });
        }
      })
      .catch((error) => {
        setLoading(false);
        toast.error("Login failed. Please try again later.");
        console.error(error.message);
      });

    reset();
  };

  // demo login function to fill up email, password and submit the form
  const handleDemoLogin = () => {
    setValue("email", "walter@white.com");
    setValue("password", "Asdf1234");
  };

  // demo login function as admin
  const handleDemoAdminLogin = () => {
    setValue("email", "admin@urbanaura.com");
    setValue("password", "Asdf1234");
  };

  // google login
  const handleGoogleLogin = () => {
    googleSignIn()
      .then((res) => {
        const loggedUser = res.user;
        if (loggedUser) {
          toast.success("Welcome back!");
          navigate(from, { replace: true });
        }
      })
      .catch((err) => {
        setLoading(false);
        toast.error("Login failed. Please try again later.");
        const errCode = err.code;
        const errMessage = err.message;
        console.error(errCode, errMessage);
      });
  };

  return (
    <section className="mx-auto h-full max-h-[1080px] min-h-screen w-full max-w-[1440px] grid-cols-12 px-[4%] py-10 font-Poppins md:grid md:px-[7%]">
      <Helmet>
        <title>Login - UrbanAura Furniture</title>
      </Helmet>
      {/* form container */}
      <div className="md:col-span-5">
        {/* Logo & Title */}
        <Link to="/" className="inline-flex items-center">
          <img className="w-8" src={logo} alt="urbanAura logo" loading="lazy" />
          <h1 className="-ml-1 font-Montserrat text-2xl font-bold md:text-[34px]">
            rbanAura
          </h1>
        </Link>
        {/* form */}
        <div className="mt-6">
          <form onSubmit={handleSubmit(onSubmit)}>
            <h1 className="text-4xl font-semibold">Welcome Back</h1>
            <p className="text-cadetGray text-xl italic">Enter you details</p>

            <label
              htmlFor="email"
              className="text-cadetGray mb-2 mt-10 block w-full"
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
              className="text-cadetGray mb-2 mt-6 block w-full"
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

            <p className="text-cadetGray mb-8 mt-6 text-right text-sm">
              Don&apos;t have account?{" "}
              <Link to="/signup" className="text-medium text-primary">
                Register
              </Link>
            </p>

            <button
              disabled={loading}
              type="Submit"
              className={`block w-full rounded-[10px] py-2 text-xl text-white ${loading ? "bg-[#b88f2fc4]" : "bg-primary transition-all hover:bg-[#a07b26]"}`}
            >
              Login
            </button>
          </form>

          {/* divider and other login buttons */}
          <div className="text-cadetGray mb-4 mt-8 flex items-center gap-2.5">
            <div className="bg-cadetGray h-0.5 w-full"></div>
            <p className="">OR</p>
            <div className="bg-cadetGray h-0.5 w-full"></div>
          </div>
          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className={`my-4 flex w-full items-center justify-center gap-3 rounded-[10px] border py-2 text-lg ${loading ? "text-cadetGray" : "transition-all hover:bg-primary hover:text-white"}`}
          >
            <img
              className="size-6"
              src={googleLogo}
              alt="google logo"
              loading="lazy"
            />
            <p>Login With Google</p>
          </button>
          <button
            onClick={handleDemoLogin}
            disabled={loading}
            className={`my-4 flex w-full items-center justify-center gap-3 rounded-[10px] border py-2 text-lg ${loading ? "text-cadetGray" : "transition-all hover:bg-primary hover:text-white"}`}
          >
            <BsFillPeopleFill
              size={24}
              color={loading ? "#9f9f9f" : undefined}
            />
            <p>Login as a Guest</p>
          </button>
          <button
            onClick={handleDemoAdminLogin}
            disabled={loading}
            className={`flex w-full items-center justify-center gap-3 rounded-[10px] border py-2 text-lg ${loading ? "text-cadetGray" : "transition-all hover:bg-primary hover:text-white"}`}
          >
            <BsFillPersonFill
              size={24}
              color={loading ? "#9f9f9f" : "#b88e2f"}
            />
            <p>Login as Demo Admin</p>
          </button>
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

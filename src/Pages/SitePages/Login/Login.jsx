import { Link, useNavigate } from "react-router-dom";
import { BsFillPeopleFill } from "react-icons/bs";
import { useForm } from "react-hook-form";
/* images */
import logo from "../../../assets/logo/logo.png";
import googleLogo from "../../../assets/logo/google-logo.png";
import loginImg from "../../../assets/images/authentication/login.jpg";
import { useContext } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";

const Login = () => {
  const { signIn, googleSignIn, loading, setLoading } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  // Form Submit handler
  const onSubmit = (data) => {
    signIn(data.email, data.password)
      .then((result) => {
        setLoading(false);
        const loggedUser = result.user;
        console.log(loggedUser);
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        console.error(error.message);
      });
  };

  // demo login function to fill up email, password and submit the form
  const handleDemoLogin = () => {
    setValue("email", "demo@example.com");
    setValue("password", "Asdf1234");
  };

  // google login
  const handleGoogleLogin = () => {
    googleSignIn()
      .then((res) => {
        const loggedUser = res.user;
        navigate("/");
        console.log(loggedUser);
      })
      .catch((err) => {
        setLoading(false);
        const errCode = err.code;
        const errMessage = err.message;
        console.error(errCode, errMessage);
      });
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
              disabled={loading}
              type="Submit"
              className={`block w-full rounded-[10px] py-2 text-xl text-white ${loading ? "bg-[#b88f2fc4]" : "bg-[#b88e2f]"}`}
            >
              Login
            </button>
          </form>

          {/* divider and other login buttons */}
          <div className="mb-4 mt-8 flex items-center gap-2.5 text-[#9f9f9f]">
            <div className="h-0.5 w-full bg-[#9f9f9f]"></div>
            <p className="">OR</p>
            <div className="h-0.5 w-full bg-[#9f9f9f]"></div>
          </div>
          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className={`my-4 flex w-full items-center justify-center gap-3 rounded-[10px] border py-2 text-lg ${loading && "text-[#9f9f9f]"}`}
          >
            <img src={googleLogo} alt="google logo" className="size-6" />
            <p>Login With Google</p>
          </button>
          <button
            onClick={handleDemoLogin}
            disabled={loading}
            className={`flex w-full items-center justify-center gap-3 rounded-[10px] border py-2 text-lg ${loading && "text-[#9f9f9f]"}`}
          >
            <BsFillPeopleFill
              size={24}
              color={loading ? "#9f9f9f" : undefined}
            />
            <p>Login With Demo Account</p>
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

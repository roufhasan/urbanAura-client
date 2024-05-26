import { Link } from "react-router-dom";
/* images */
import logo from "../../../assets/logo/logo.png";
import signupImg from "../../../assets/images/authentication/signup.jpg";
import { useForm } from "react-hook-form";

const Signup = () => {
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
          <form onSubmit={handleSubmit(onSubmit)}>
            <h1 className="text-4xl font-semibold">Furnish Your Space</h1>
            <p className="text-xl italic text-[#9f9f9f]">Join Us Today</p>

            <label
              htmlFor="name"
              className="mb-2 mt-10 block w-full text-[#9f9f9f]"
            >
              {errors.name ? (
                <span className="text-red-500">Name is required*</span>
              ) : (
                "Name"
              )}
            </label>
            <input
              className="block w-full rounded-[10px] border px-3 py-2 text-lg outline-none focus:border-gray-500"
              type="text"
              id="name"
              {...register("name", { required: true })}
            />
            <label
              htmlFor="email"
              className="mb-2 mt-6 block w-full text-[#9f9f9f]"
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

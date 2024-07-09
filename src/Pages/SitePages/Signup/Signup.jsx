import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet";
import { AuthContext } from "../../../Providers/AuthProvider";
/* images */
import logo from "../../../assets/logo/logo.png";
import signupImg from "../../../assets/images/authentication/signup.jpg";

const Signup = () => {
  // Auth Context for user creation
  const { createUser, updateUserProfile, loading, setLoading } =
    useContext(AuthContext);
  // React Hook Form Setup
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  // Form Submit handler
  const onSubmit = (data) => {
    // create new user with email and password
    createUser(data.email, data.password)
      .then((result) => {
        const loggedUser = result.user;
        console.log(loggedUser);

        // Update user profile name
        updateUserProfile(data.name)
          .then(() => {
            // Navigate to home page after successful profile update
            navigate("/");
            setLoading(false);
          })
          .catch((error) => {
            // Handle error during profile update
            console.error("Profile update error:", error);
          });
      })
      .catch((error) => {
        // Handle error during user creation
        setLoading(false);
        console.error(error.message);
      });
  };

  return (
    <section className="mx-auto h-full max-h-[1080px] min-h-screen w-full max-w-[1440px] grid-cols-12 px-[4%] py-10 font-Poppins md:grid md:px-[7%]">
      <Helmet>
        <title>Sign Up - UrbanAura Furniture</title>
      </Helmet>
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
          <img className="w-8" src={logo} alt="urbanAura logo" />
          <h1 className="-ml-1 font-Montserrat text-2xl font-bold md:text-[34px]">
            rbanAura
          </h1>
        </Link>
        {/* form */}
        <div className="mt-6">
          <form onSubmit={handleSubmit(onSubmit)}>
            <h1 className="text-4xl font-semibold">Furnish Your Space</h1>
            <p className="mt-2 text-xl italic text-[#9f9f9f]">Join Us Today</p>

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
              disabled={loading}
              type="Submit"
              className={`block w-full rounded-[10px] py-2 text-xl text-white ${loading ? "bg-[#b88f2fc4]" : "bg-[#b88e2f]"}`}
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

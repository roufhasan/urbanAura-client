import { useContext } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Dialog, DialogPanel } from "@headlessui/react";
import { BsFillPeopleFill } from "react-icons/bs";
import { AuthContext } from "../../Providers/AuthProvider";
import googleLogo from "../../assets/logo/google-logo.png";

const LoginModal = ({ isOpen, setIsOpen }) => {
  const { signIn, googleSignIn, loading, setLoading } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  // Form Submit handler
  const onSubmit = (data) => {
    signIn(data.email, data.password)
      .then((result) => {
        const loggedUser = result.user;
        console.log(loggedUser);
        setLoading(false);
        setIsOpen(false);
      })
      .catch((error) => {
        setLoading(false);
        console.error(error.message);
        setIsOpen(false);
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
        console.log(loggedUser);
        setIsOpen(false);
      })
      .catch((err) => {
        setLoading(false);
        const errCode = err.code;
        const errMessage = err.message;
        console.error(errCode, errMessage);
        setIsOpen(false);
      });
  };

  return (
    <>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 flex w-screen items-center justify-center overflow-y-auto bg-black/50">
          <DialogPanel className="w-full space-y-4 border bg-white px-6 py-10 md:h-fit md:w-fit md:px-12">
            <div className="flex items-center justify-between text-2xl font-semibold">
              <div>
                <p>Login</p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="flex size-6 items-center justify-center rounded-full bg-gray-200 text-base transition-all hover:bg-gray-300"
              >
                X
              </button>
            </div>
            <div className="flex flex-col justify-center px-3 md:flex-row md:items-center md:gap-10">
              <form onSubmit={handleSubmit(onSubmit)} className="md:min-w-80">
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

                <button
                  disabled={loading}
                  type="Submit"
                  className={`mt-8 block w-full rounded-[10px] py-2 text-xl text-white ${loading ? "bg-[#b88f2fc4]" : "bg-[#b88e2f]"}`}
                >
                  Login
                </button>
              </form>

              {/* Social Buttons */}
              <div className="md:min-w-[302px]">
                <button
                  disabled={loading}
                  onClick={handleGoogleLogin}
                  className={`my-4 flex w-full items-center justify-center gap-3 rounded-[10px] border px-3 py-2 text-lg md:px-6 ${loading && "text-[#9f9f9f]"}`}
                >
                  <img src={googleLogo} alt="google logo" className="size-6" />
                  <p>Login With Google</p>
                </button>
                <button
                  disabled={loading}
                  onClick={handleDemoLogin}
                  className={`flex w-full items-center justify-center gap-3 rounded-[10px] border px-3 py-2 text-lg md:px-6 ${loading && "text-[#9f9f9f]"}`}
                >
                  <BsFillPeopleFill
                    size={24}
                    color={loading ? "#9f9f9f" : undefined}
                  />
                  <p>Login With Demo Account</p>
                </button>
                <p className="mb-8 mt-6 text-center text-sm text-[#9f9f9f]">
                  Don&apos;t have account?{" "}
                  <Link to="/signup" className="text-medium text-[#b88e2f]">
                    Register
                  </Link>
                </p>
              </div>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
};

export default LoginModal;

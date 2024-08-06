import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { BsFillPeopleFill, BsFillPersonFill, BsXLg } from "react-icons/bs";
import googleLogo from "../../../assets/logo/google-logo.png";
import useAuth from "../../../hooks/useAuth";

const LoginModal = ({ isOpen, setIsOpen }) => {
  const { signIn, googleSignIn, loading, setLoading } = useAuth();
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
        const loggedUser = result.user;
        if (loggedUser) {
          setLoading(false);
          setIsOpen(false);
          toast.success("Welcome back!");
        }
      })
      .catch((error) => {
        console.error(error.message);
        setLoading(false);
        setIsOpen(false);
        toast.error("Login failed. Please try again later.");
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
          setIsOpen(false);
          toast.success("Welcome back!");
        }
      })
      .catch((err) => {
        setLoading(false);
        setIsOpen(false);
        toast.error("Login failed. Please try again later.");
        const errCode = err.code;
        const errMessage = err.message;
        console.error(errCode, errMessage);
      });
  };

  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="relative z-50"
    >
      <div className="fixed inset-0 flex w-screen items-center justify-center overflow-y-auto bg-black/50">
        <DialogPanel className="w-full space-y-4 rounded-[10px] border bg-white px-6 py-10 md:h-fit md:w-fit md:px-12">
          <DialogTitle className="flex items-center justify-between text-xl font-semibold">
            <div>
              <p>Welcome! Please Login to continue.</p>
            </div>
            <BsXLg
              onClick={() => setIsOpen(false)}
              size={24}
              className="text-cadetGray cursor-pointer transition-all hover:text-[#8f8f8f]"
            />
          </DialogTitle>

          <div className="flex flex-col justify-center px-3 md:flex-row md:items-center md:gap-10">
            <form onSubmit={handleSubmit(onSubmit)} className="md:min-w-80">
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

              <button
                disabled={loading}
                type="Submit"
                className={`mt-8 block w-full rounded-[10px] py-2 text-xl text-white ${loading ? "bg-[#b88f2fc4]" : "bg-primary transition-all hover:bg-[#a07b26]"}`}
              >
                Login
              </button>
            </form>

            {/* Social Buttons */}
            <div className="md:min-w-[302px]">
              <button
                disabled={loading}
                onClick={handleGoogleLogin}
                className={`my-4 flex w-full items-center justify-center gap-3 rounded-[10px] border px-3 py-2 text-lg md:px-6 ${loading ? "text-cadetGray" : "transition-all hover:bg-primary hover:text-white"}`}
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
                disabled={loading}
                onClick={handleDemoLogin}
                className={`my-4 flex w-full items-center justify-center gap-3 rounded-[10px] border px-3 py-2 text-lg md:px-6 ${loading ? "text-cadetGray" : "transition-all hover:bg-primary hover:text-white"}`}
              >
                <BsFillPeopleFill
                  size={24}
                  color={loading ? "#9f9f9f" : undefined}
                />
                <p>Login as a Guest</p>
              </button>
              <button
                disabled={loading}
                onClick={handleDemoAdminLogin}
                className={`flex w-full items-center justify-center gap-3 rounded-[10px] border px-3 py-2 text-lg md:px-6 ${loading ? "text-cadetGray" : "transition-all hover:bg-primary hover:text-white"}`}
              >
                <BsFillPersonFill
                  size={24}
                  color={loading ? "#9f9f9f" : "#b88e2f"}
                />
                <p>Login as Demo Admin</p>
              </button>
              <p className="text-cadetGray mb-8 mt-6 text-center text-sm">
                Don&apos;t have account?{" "}
                <Link to="/signup" className="text-medium text-primary">
                  Register
                </Link>
              </p>
            </div>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default LoginModal;

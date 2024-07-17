import { useContext, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import toast from "react-hot-toast";
import { FaUser } from "react-icons/fa";
import {
  BsFillTrash3Fill,
  BsGear,
  BsPencilSquare,
  BsPersonGear,
} from "react-icons/bs";
import { TbCameraPlus } from "react-icons/tb";
import { motion } from "framer-motion";
import { AuthContext } from "../../../../Providers/AuthProvider";

const AccountSettings = () => {
  const { user, updateUserProfile, deleteAccount, setLoading, loading } =
    useContext(AuthContext);
  const [name, setName] = useState(user.displayName);
  const [activeTab, setActiveTab] = useState("profile");
  const [nameReadOnly, setNameReadOnly] = useState(true);
  const [selectedImg, setSelectedImg] = useState(null);
  const [deleteValue, setDeleteValue] = useState("");
  const navigate = useNavigate();
  const imgRef = useRef(null);

  // Image click
  const handleImageClick = () => {
    imgRef.current.click();
  };

  // Show currently selected image
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImg(file);
  };

  // Upload new profile picture / name
  const handleUpdateProfile = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const image = selectedImg;

    if (image) {
      const formData = new FormData();
      formData.append("image", image);

      const url = `https://api.imgbb.com/1/upload?key=${
        import.meta.env.VITE_Image_Upload_API_Key
      }`;

      fetch(url, {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((imageData) => {
          if (!imageData || !imageData.data || !imageData.data.display_url) {
            return toast.error(
              "Failed to upload image. Please try again later.",
            );
          }
          const imageURL = imageData.data.display_url;
          updateUserProfile(name, imageURL)
            .then(() => {
              setLoading(false);
              toast.success("Your profile updated successfully!");
              navigate("/");
            })
            .catch((err) => {
              console.log(err.message);
              setLoading(false);
              toast.error("Failed to update profile. Please try again later.");
            });
        });
      return;
    }

    if (name !== user?.displayName) {
      updateUserProfile(name, user?.photoURL)
        .then(() => {
          setLoading(false);
          toast.success("Profile Updated");
          navigate("/");
        })
        .catch((err) => {
          setLoading(false);
          console.log(err.message);
        });
    }
    return;
  };

  // Handle Account Delete
  const handleAccountDelete = () => {
    if (user.email === "walter@white.com") {
      setDeleteValue("");
      toast.error("You can't delete guest account!");
      return;
    }
    deleteAccount()
      .then(() => {
        setLoading(false);
        toast.success("Account Deleted");
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        if (error.message === "Firebase: Error (auth/requires-recent-login).") {
          setLoading(false);
          toast.error(
            "For security reasons, please log out and log in again to delete your account.",
          );
          navigate("/");
          return;
        }
        setLoading(false);
        toast.error("An Error Ocurred!");
        navigate("/");
      });
  };

  return (
    <section className="px-[4%] md:px-[7%]">
      <Helmet>
        <title>My Account - UrbanAura Furniture</title>
      </Helmet>
      <h1 className="pt-6 text-2xl font-medium">Account Settings</h1>
      <div className="mb-5 mt-10 flex w-full">
        <p
          onClick={() => setActiveTab("profile")}
          className={`flex w-1/2 cursor-pointer items-center justify-center gap-1.5 border-b-2 pb-2 text-center font-semibold transition-all ${
            activeTab === "profile"
              ? "border-[#b88e2f] text-[#b88e2f]"
              : "text-gray-400/90 hover:text-[#b88e2f]"
          }`}
        >
          <BsPersonGear size={22} />
          My Profile
        </p>
        <p
          onClick={() => setActiveTab("settings")}
          className={`flex w-1/2 cursor-pointer items-center justify-center gap-1.5 border-b-2 pb-2 font-semibold transition-all ${
            activeTab === "settings"
              ? "border-[#b88e2f] text-[#b88e2f]"
              : "text-gray-400/90 hover:text-[#b88e2f]"
          }`}
        >
          <BsGear size={18} />
          Advance
        </p>
      </div>

      {/* Conditionally render tab content */}
      {activeTab === "profile" && (
        <form onSubmit={handleUpdateProfile}>
          <div className="flex flex-col items-center gap-10 pb-40 pt-20 md:flex-row-reverse md:items-start md:justify-evenly md:gap-20">
            {/* Profile Image */}
            <div className="text-center">
              {selectedImg ? (
                <motion.img
                  whileTap={{ scale: 0.9 }}
                  onClick={handleImageClick}
                  src={URL.createObjectURL(selectedImg)}
                  alt=""
                  className="mb-7 h-40 w-40 cursor-pointer rounded-full object-cover"
                />
              ) : (
                <>
                  {user.photoURL ? (
                    <motion.img
                      whileTap={{ scale: 0.9 }}
                      onClick={handleImageClick}
                      src={user?.photoURL}
                      alt=""
                      className="mb-7 h-40 w-40 cursor-pointer rounded-full object-cover"
                    />
                  ) : (
                    <motion.div
                      whileTap={{ scale: 0.9 }}
                      onClick={handleImageClick}
                      className="mb-7 h-40 w-40 cursor-pointer"
                    >
                      <FaUser className="size-full" />
                    </motion.div>
                  )}
                </>
              )}

              <label
                onClick={handleImageClick}
                className="cursor-pointer rounded-md px-3 py-1 font-medium"
              >
                {user.photoURL ? (
                  <motion.span className="flex items-center gap-2 rounded-md border border-[#b88e2f] px-3 py-1 transition-all hover:bg-[#b88e2f] hover:text-white">
                    <TbCameraPlus className="text-xl" /> Change Avatar
                  </motion.span>
                ) : (
                  <motion.span
                    whileTap={{ scale: 0.9 }}
                    className="flex items-center gap-2 rounded-md border border-[#b88e2f] px-3 py-1 transition-all hover:bg-[#b88e2f] hover:text-white"
                  >
                    <TbCameraPlus className="text-xl" /> Upload Avatar
                  </motion.span>
                )}
              </label>
              <input
                ref={imgRef}
                onChange={handleImageChange}
                className="hidden"
                type="file"
                id="image"
                name="image"
                accept="image/*"
              />
            </div>

            {/* Email and Name filed container */}
            <div className="flex flex-col gap-10 md:w-1/2">
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 flex w-full justify-between"
                >
                  <span
                    className={`font-medium ${nameReadOnly ? "text-black/50" : "text-black"} `}
                  >
                    Full Name
                  </span>
                  <motion.span
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setNameReadOnly(false)}
                    className="cursor-pointer text-gray-400 transition-all hover:text-[#b88e2f]"
                  >
                    <BsPencilSquare />
                  </motion.span>
                </label>
                {nameReadOnly ? (
                  <input
                    className="h-10 w-full rounded-xl border border-black/20 px-4 text-black/75 outline-none"
                    type="text"
                    id="name"
                    name="defaultName"
                    readOnly
                    value={name}
                  />
                ) : (
                  <input
                    onChange={(e) => setName(e.target.value)}
                    onBlur={() => setNameReadOnly(true)}
                    className={`h-10 w-full rounded-xl border px-4 text-black outline-none focus:border-black/40`}
                    type="text"
                    id="name"
                    value={name}
                    name="name"
                  />
                )}
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 inline-block w-full font-medium text-black/50"
                >
                  Email
                </label>
                <input
                  className="h-10 w-full rounded-xl border border-black/20 px-4 text-black/75 outline-none"
                  type="email"
                  id="email"
                  name="email"
                  readOnly
                  value={user.email}
                />
              </div>
              {/* cancel or save changes buttons */}
              <div className="flex w-full items-center justify-center gap-10">
                <motion.p whileTap={{ scale: 0.9 }} className="w-1/2">
                  <Link
                    to="/"
                    className="text block w-full rounded-md border border-black px-3 py-1 text-center font-medium transition-all hover:bg-black hover:text-white"
                  >
                    Cancel
                  </Link>
                </motion.p>
                {selectedImg || name !== user?.displayName ? (
                  <button
                    disabled={loading}
                    type="submit"
                    className="w-1/2 rounded-md bg-[#b88e2f] px-3 py-1.5 text-center font-medium text-white"
                  >
                    Update
                  </button>
                ) : (
                  <button
                    disabled
                    type="submit"
                    className="w-1/2 rounded-md bg-[#b88e2f]/80 px-3 py-1.5 text-center font-medium text-white"
                  >
                    Update
                  </button>
                )}
              </div>
            </div>
          </div>
        </form>
      )}

      {activeTab === "settings" && (
        <div className="pb-40 pt-6">
          <h3 className="mb-6 text-xl font-medium">Deleting account?</h3>
          <p className="mb-6 w-full max-w-sm text-sm">
            Deleting your account will remove all of your information from our
            database. This cannot be undone.
          </p>
          <p className="mb-2 text-sm text-gray-400">
            To confirm this, type{" "}
            <span className="font-medium text-black">&quot;DELETE&quot;</span>
          </p>
          <input
            type="text"
            name="delete"
            id="delete"
            value={deleteValue}
            onChange={(e) => setDeleteValue(e.target.value)}
            className="rounded-lg border px-4 py-2 outline-none"
          />
          <button
            onClick={handleAccountDelete}
            disabled={deleteValue !== "DELETE"}
            className={`mt-4 flex items-center gap-2 rounded-lg px-4 py-2 text-xs text-red-600 transition-all ${deleteValue === "DELETE" && "bg-red-500 text-white"}`}
          >
            <BsFillTrash3Fill />
            Delete Permanently
          </button>
        </div>
      )}
    </section>
  );
};

export default AccountSettings;

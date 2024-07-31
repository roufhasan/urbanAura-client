import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import useAxiosSecure from "./useAxiosSecure";

const useAdmin = () => {
  const { user } = useContext(AuthContext);
  const { axiosSecure } = useAxiosSecure();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const fetchAdminStatus = async () => {
      if (user && user.email) {
        // Retry up to 3 times
        for (let i = 0; i < 3; i++) {
          try {
            const response = await axiosSecure.get(
              `/users/admin/${user.email}`,
            );
            setIsAdmin(response.data.admin);

            return;
          } catch (err) {
            if (i === 2) {
              console.error(
                "Failed to fetch admin status after multiple attempts",
              );
            }
            await new Promise((resolve) => setTimeout(resolve, 1000));
          }
        }
      }
    };

    fetchAdminStatus();
  }, [user, axiosSecure]);

  return isAdmin;
};

export default useAdmin;

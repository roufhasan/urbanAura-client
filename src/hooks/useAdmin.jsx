import { useEffect, useState } from "react";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useAdmin = () => {
  const { user } = useAuth();
  const { axiosSecure } = useAxiosSecure();
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminLoading, setAdminLoading] = useState(true);

  useEffect(() => {
    const fetchAdminStatus = async () => {
      if (user && user.email) {
        // Retry up to 3 times
        for (let i = 0; i < 3; i++) {
          try {
            const response = await axiosSecure.get(
              `/users/admin/${user.email}`,
              { params: { userEmail: user.email } },
            );
            setIsAdmin(response.data.admin);
            setAdminLoading(false);
            return;
          } catch (err) {
            if (i === 2) {
              console.error(
                "Failed to fetch admin status after multiple attempts",
              );
              setAdminLoading(false);
            }
            await new Promise((resolve) => setTimeout(resolve, 1000));
          }
        }
      } else {
        setAdminLoading(false);
      }
    };

    fetchAdminStatus();
  }, [user, axiosSecure]);

  return { isAdmin, adminLoading };
};

export default useAdmin;

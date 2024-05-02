import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { formatDate } from "@/lib/dateFormat";
import { useGetUser } from "@/customhooks/useGetUser";

export const fetchUserAdmins = () => {
  const { agency } = useGetUser();
  const fetchUsers = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_API_URL}/api/user`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = await res.data;

      const sortedReport = data?.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );

      const formattedUser = sortedReport.map((user) => ({
        ...user,
        createdAt: formatDate(user.createdAt),
      }));

      // const filteredUser = formattedUser.filter(
      //   (user) => user.agency === agency
      // );

      return formattedUser;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const { data } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  return { data };
};

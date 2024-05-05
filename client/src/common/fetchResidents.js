import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { formatDate } from "@/lib/dateFormat";
import { useGetUser } from "@/customhooks/useGetUser";

export const fetchAllResidents = () => {
  const fetchResidents = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_API_URL}/api/resident`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = await res.data;

      const sortedResident = data?.sort(
        (a, b) => new Date(b.registeredAt) - new Date(a.registeredAt)
      );

      const formattedResident = sortedResident.map((user) => ({
        ...user,
        registeredAt: formatDate(user.registeredAt),
      }));

      // const filteredUser = formattedResident.filter(
      //   (user) => user.agency === agency
      // );

      return formattedResident;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const { data } = useQuery({
    queryKey: ["residents"],
    queryFn: fetchResidents,
  });

  return { data };
};

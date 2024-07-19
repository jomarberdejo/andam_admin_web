import { useQuery } from "@tanstack/react-query";
import { formatDate } from "@/lib/dateFormat";
import axios from "axios";
import { useGetUser } from "@/customhooks/useGetUser";

export const fetchFeedbacks = () => {
  const { agency, id } = useGetUser();
  const fetchFeedback = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_API_URL}/api/feedback`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const data = await res.data;

      const sortedFeedback = data?.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );

      const formattedFeedback = sortedFeedback.map((feedback) => ({
        ...feedback,
        createdAt: formatDate(feedback.createdAt),
      }));

      return formattedFeedback;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const { data: feedbackData } = useQuery({
    queryKey: ["feedbackdata"],
    queryFn: fetchFeedback,
  });

  return { feedbackData };
};

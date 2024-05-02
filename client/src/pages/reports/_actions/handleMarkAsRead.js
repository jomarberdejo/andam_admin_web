import axios from "axios";

export const handleMarkAsRead = () => {
  const markAsRead = async () => {
    try {
      await axios.put(
        `${import.meta.env.VITE_BACKEND_API_URL}/api/report`,
        {
          isNew: false,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
    } catch (error) {
      console.error("Error updating isNew:", error);
    }
  };

  return { markAsRead };
};

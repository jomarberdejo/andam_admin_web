import { useQuery } from "@tanstack/react-query";
import { formatDate } from "@/lib/dateFormat";
import axios from "axios";
import { useGetUser } from "@/customhooks/useGetUser";

export const fetchReports = () => {
  const { agency, id } = useGetUser();
  const fetchReport = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_API_URL}/api/report`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const data = await res.data;

      const sortedReport = data?.sort(
        (a, b) => new Date(b.reportedAt) - new Date(a.reportedAt)
      );

      const formattedReport = sortedReport.map((report) => ({
        ...report,
        reportedAt: formatDate(report.reportedAt),
      }));

      // const filteredReportByAgency = formattedReport.filter(
      //   (report) => report.agency === agency
      // );

      return formattedReport;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const { data: reportData } = useQuery({
    queryKey: ["reportdata"],
    queryFn: fetchReport,
  });

  return { reportData };
};

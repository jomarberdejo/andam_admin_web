import { Bar, BarChart, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BarChartIcon } from "lucide-react";
import { CardHeader, CardTitle } from "@/components/ui/card";
import { useTheme } from "@/context/ThemeContextProvider";

import { monthsInOrder } from "../constants";
import { fetchReports } from "@/common/fetchReports";

export const Trends = () => {
  const { theme } = useTheme();
  const [monthlyReports, setMonthlyReports] = useState([]);
  const [availableYears, setAvailableYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState("All"); 
  const { reportData } = fetchReports();

  const handleYearChange = (value) => {
    setSelectedYear(value);
    filterReportsByYear(value ? parseInt(value) : "All");
  };

  const filterReportsByYear = (year) => {
    if (!reportData) return;

    let filteredReports = reportData;
    if (year && year !== "All") {
      filteredReports = reportData.filter(
        (report) => new Date(report.reportedAt).getFullYear() === year
      );
    }
    
    const monthlyTotals = Object.fromEntries(
      monthsInOrder.map((month) => [month, 0])
    );

    

    filteredReports.forEach((report) => {
      const month = new Date(report.reportedAt).toLocaleString("default", {
        month: "short"
      });
      monthlyTotals[month]++;
    });

    console.log(monthlyTotals)

    const monthlyData = monthsInOrder.map((month) => ({
      name: month,
      reports: monthlyTotals[month]
    }));

    setMonthlyReports(monthlyData);
  };

  useEffect(() => {
    console.log("Rendered")
    console.log(availableYears)
    
    if (reportData) {
      const years = Array.from(
        new Set(
          reportData.map((report) =>
            new Date(report.reportedAt).getFullYear()
          )
        )
      ).sort((a, b) => b - a);
      setAvailableYears(years);
      filterReportsByYear(selectedYear); 
    }
  }, [reportData]);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const value = payload[0].value;

      return (
        <div className={`p-2 rounded shadow-md ${theme === "dark" ? "bg-black" : "bg-white"}`}>
          <p className={`font-medium text-sm ${theme === "dark" ? "text-white" : "text-black"}`}>
            {`${label}: ${value} Reports`}
          </p>
        </div>
      );
    }

    return null;
  };

  return (
    <div>
      <aside className="flex justify-between items-center pt-4 pb-8">
        <CardHeader className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <BarChartIcon className="h-5 w-5 " />
            <CardTitle>Trends</CardTitle>
          </div>
        </CardHeader>
        <Select onValueChange={handleYearChange} defaultValue="All">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by timeframe" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All</SelectItem>
            {availableYears.map((year) => (
              <SelectItem key={year} value={year}>
                {year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </aside>

      <ResponsiveContainer width="100%" height={450}>
        <BarChart data={monthlyReports}>
          <XAxis
            dataKey="name"
            stroke="#888888"
            fontSize={12}
            axisLine={false}
          />
          <YAxis stroke="#888888" fontSize={12} />
          {/* Using CustomTooltip instead of default Tooltip */}
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Bar dataKey="reports" fill="#1F75FE" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

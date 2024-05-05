import { CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { KeySquare } from "lucide-react";
import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const UserLoginAnalytics = () => {
  const fetchEntry = async () => {
    const res = await axios.get(
      `${import.meta.env.VITE_BACKEND_API_URL}/api/entry`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    const entryData = await res.data;
    console.log(entryData);
    return entryData;
  };

  const { data } = useQuery({
    queryKey: ["entry"],
    queryFn: fetchEntry,
  });

  const userEntryData =
    data?.reduce((acc, entry) => {
      const datePart = entry.date.split(" ")[0];

      if (acc[datePart]) {
        acc[datePart].logins += 1;
      } else {
        acc[datePart] = {
          name: datePart,
          logins: 1,
        };
      }

      return acc;
    }, {}) || [];

  const userActivityArray = Object.values(userEntryData);

  userActivityArray.sort((a, b) => new Date(a.name) - new Date(b.name));

  const [timeframe, setTimeframe] = useState("thisDay");

  const filterDataByTimeframe = (data, timeframe) => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;

    const currentDayOfWeek = currentDate.getDay();
    const startOfThisWeek = new Date(currentDate);
    const diff =
      currentDate.getDate() -
      currentDayOfWeek +
      (currentDayOfWeek === 0 ? -6 : 1);
    startOfThisWeek.setDate(diff);
    startOfThisWeek.setHours(0, 0, 0, 0);

    const endOfThisWeek = new Date(startOfThisWeek);
    endOfThisWeek.setDate(startOfThisWeek.getDate() + 6);
    endOfThisWeek.setHours(23, 59, 59, 999);

    const formatDate = (date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    };

    let filteredData = [];

    switch (timeframe) {
      case "thisDay":
        const formattedDate = formatDate(currentDate);
        filteredData = data.filter((entry) => entry.name === formattedDate);
        break;
      case "yesterday":
        const yesterday = new Date(currentDate);
        yesterday.setDate(currentDate.getDate() - 1);
        const yesterdayFormatted = formatDate(yesterday);
        filteredData = data.filter(
          (entry) => entry.name === yesterdayFormatted
        );
        break;
      case "thisWeek":
        filteredData = data.filter(
          (entry) =>
            new Date(entry.name) >= startOfThisWeek &&
            new Date(entry.name) <= endOfThisWeek
        );
        break;
      case "lastWeek":
        const startOfLastWeek = new Date(startOfThisWeek);
        startOfLastWeek.setDate(startOfThisWeek.getDate() - 7);
        const endOfLastWeek = new Date(endOfThisWeek);
        endOfLastWeek.setDate(endOfThisWeek.getDate() - 7);
        filteredData = data.filter(
          (entry) =>
            new Date(entry.name) >= startOfLastWeek &&
            new Date(entry.name) <= endOfLastWeek
        );
        break;
      case "thisMonth":
        const startOfMonth = new Date(currentYear, currentMonth - 1, 1);
        startOfMonth.setHours(0, 0, 0, 0);

        const endOfMonth = new Date(currentYear, currentMonth, 0);
        endOfMonth.setHours(23, 59, 59, 999);

        filteredData = data.filter(
          (entry) =>
            new Date(entry.name) >= startOfMonth &&
            new Date(entry.name) <= endOfMonth
        );
        break;
      case "lastMonth":
        const startOfLastMonth = new Date(currentYear, currentMonth - 2, 1);
        startOfLastMonth.setHours(0, 0, 0, 0);

        const endOfLastMonth = new Date(currentYear, currentMonth - 1, 0);
        endOfLastMonth.setHours(23, 59, 59, 999);

        filteredData = data.filter(
          (entry) =>
            new Date(entry.name) >= startOfLastMonth &&
            new Date(entry.name) <= endOfLastMonth
        );
        break;
      case "thisYear":
        filteredData = data.filter((entry) => {
          const entryYear = new Date(entry.name).getFullYear();
          return entryYear === currentYear;
        });
        break;
      case "lastYear":
        const startOfLastYear = new Date(currentYear - 1, 0, 1);
        const endOfLastYear = new Date(currentYear - 1, 11, 31);

        filteredData = data.filter(
          (entry) =>
            new Date(entry.name) >= startOfLastYear &&
            new Date(entry.name) <= endOfLastYear
        );
        break;
      // case "allTime":
      //   filteredData = data;
      //   break;
      default:
        filteredData = data;
        break;
    }

    return filteredData;
  };

  const handleTimeframeChange = (selectedTimeframe) => {
    setTimeframe(selectedTimeframe);
  };

  return (
    <div className=" p-4 ">
      <div className="flex items-center space-x-2 mt-2">
        <KeySquare className="h-5 w-5 " />
        <CardTitle>Administrator's Logins Over Time</CardTitle>
      </div>

      <div className="flex flex-wrap gap-2 mb-4 mt-6">
        {/* <button
          className={`bg-blue-500 text-white px-4 py-2 rounded ${
            timeframe === "allTime" ? "bg-blue-700" : ""
          }`}
          onClick={() => handleTimeframeChange("allTime")}
        >
          All Time
        </button> */}
        <button
          className={`bg-blue-500 text-white px-4 py-2 rounded ${
            timeframe === "thisDay" ? "bg-blue-700" : ""
          }`}
          onClick={() => handleTimeframeChange("thisDay")}
        >
          This Day
        </button>
        <button
          className={`bg-blue-500 text-white px-4 py-2 rounded ${
            timeframe === "yesterday" ? "bg-blue-700" : ""
          }`}
          onClick={() => handleTimeframeChange("yesterday")}
        >
          Yesterday
        </button>
        <button
          className={`bg-blue-500 text-white px-4 py-2 rounded ${
            timeframe === "thisWeek" ? "bg-blue-700" : ""
          }`}
          onClick={() => handleTimeframeChange("thisWeek")}
        >
          This Week
        </button>
        <button
          className={`bg-blue-500 text-white px-4 py-2 rounded ${
            timeframe === "lastWeek" ? "bg-blue-700" : ""
          }`}
          onClick={() => handleTimeframeChange("lastWeek")}
        >
          Last Week
        </button>
        <button
          className={`bg-blue-500 text-white px-4 py-2 rounded ${
            timeframe === "thisMonth" ? "bg-blue-700" : ""
          }`}
          onClick={() => handleTimeframeChange("thisMonth")}
        >
          This Month
        </button>
        <button
          className={`bg-blue-500 text-white px-4 py-2 rounded ${
            timeframe === "lastMonth" ? "bg-blue-700" : ""
          }`}
          onClick={() => handleTimeframeChange("lastMonth")}
        >
          Last Month
        </button>
        <button
          className={`bg-blue-500 text-white px-4 py-2 rounded ${
            timeframe === "thisYear" ? "bg-blue-700" : ""
          }`}
          onClick={() => handleTimeframeChange("thisYear")}
        >
          This Year
        </button>
        <button
          className={`bg-blue-500 text-white px-4 py-2 rounded ${
            timeframe === "lastYear" ? "bg-blue-700" : ""
          }`}
          onClick={() => handleTimeframeChange("lastYear")}
        >
          Last Year
        </button>
      </div>

      <div className=" p-4 rounded shadow">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            width={500}
            height={300}
            data={filterDataByTimeframe(userActivityArray, timeframe)}
            margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="logins" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default UserLoginAnalytics;

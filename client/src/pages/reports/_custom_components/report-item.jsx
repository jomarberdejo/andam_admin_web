import { fetchReports } from "@/common/fetchReports";
import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const ReportItem = () => {
  const { id } = useParams();
  const { reportData } = fetchReports();
  const navigate = useNavigate();
  const report = reportData?.find((item) => item.id === id);

  const isImage = (url) => {
    return /\.(gif|jpe?g|tiff?|png|webp|bmp)$/i.test(url);
  };

  const generateMapLink = (location, fullLocationText) => {
    if (location) {
      return `/maps?location=${encodeURIComponent(
        location
      )}&fullLocation=${encodeURIComponent(fullLocationText)}`;
    }
    return "/maps";
  };

  console.log(report);

  return (
    <div className="rounded-lg shadow-lg p-6 mb-4 flex justify-center  flex-wrap">
      {/* {!report?.imageUrl && (
        <div className="flex-none w-full mr-0 sm:mr-6">
          {isImage(
            "https://hips.hearstapps.com/hmg-prod/images/7-64ecb1c909b78.png"
          ) ? (
            <img
              src={
                "https://hips.hearstapps.com/hmg-prod/images/7-64ecb1c909b78.png"
              }
              alt="Report"
              className="w-full h-full object-cover rounded-lg"
            />
          ) : (
            <video
              src={
                "https://hips.hearstapps.com/hmg-prod/images/7-64ecb1c909b78.png"
              }
              alt="Report"
              className="w-full h-full object-cover rounded-lg"
              controls
            />
          )}
        </div>
      )} */}
      <div className="flex flex-col w-full mt-4">
        <h2 className="text-xl font-semibold mb-4">Report Details</h2>
        {/* <p className="mb-2">
          <strong>ID:</strong> {report?.id}
        </p> */}
        <p
          className="mb-2 cursor-pointer underline link-underline-info underline-offset-4"
          onClick={() => navigate(`/residents/${report.residentId}`)}
        >
          <strong>Reported By:</strong> {report?.name}
        </p>
        <p className="mb-2">
          <strong>Problem Detail:</strong> {report?.detail}
        </p>
        <p className="mb-2 underline link-underline-info  underline-offset-4">
          <strong>Location: </strong>
          <Link
            to={generateMapLink(
              `${report?.latitude},${report?.longitude}`,
              report?.location
            )}
          >
            {report?.location}
          </Link>
        </p>
        <p className="mb-2 underline link-underline-info  underline-offset-4">
          <strong>Phone:</strong>{" "}
          <a href={`tel:${report?.contact}`}>{report?.contact}</a>
        </p>

        <p className="mb-2">
          <strong>Reported At:</strong> {report?.reportedAt}
        </p>
      </div>
    </div>
  );
};

export default ReportItem;

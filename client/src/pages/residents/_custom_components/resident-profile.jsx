import { fetchAllResidents } from "@/common/fetchResidents";
import { useGetUser } from "@/customhooks/useGetUser";
import React from "react";
import { Link, useParams } from "react-router-dom";

const ResidentProfile = () => {
  const { agency } = useGetUser();
  const { id } = useParams();
  const { data: residentData } = fetchAllResidents();
  const resident = residentData?.find((item) => item.id === id);

  const totalReports = resident.reports.filter(
    (report) => report.agency === agency
  );

  return (
    <div className="rounded-lg shadow-lg p-6 mb-4 flex justify-center  flex-wrap">
      <div className="flex flex-col w-full mt-4">
        <h2 className="text-xl font-semibold mb-4">
          {resident?.fullName}`s Profile
        </h2>
        <p className="font-bold text-lg">Proof of Identity Image:</p>
        <div className="w-full md:w-[600px] my-4 mr-0 sm:mr-6">
          <img
            src={resident?.imageIdentityUrl}
            alt="resident-identity-image"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
        <p className="mb-2">
          <strong>Name:</strong> {resident?.fullName}
        </p>

        <p className="mb-2 flex items-center gap-2">
          <strong>Total Reports Made:</strong>{" "}
          <span className="font-medium text-xl">{totalReports.length}</span>
        </p>
        <p className="mb-2 underline link-underline-info  underline-offset-4">
          <strong>Registered Number:</strong>{" "}
          <a href={`tel:${resident?.contactNumber}`}>
            {resident?.contactNumber}
          </a>
        </p>

        <p className="mb-2">
          <strong>Date Registered:</strong> {resident?.registeredAt}
        </p>
      </div>
    </div>
  );
};

export default ResidentProfile;

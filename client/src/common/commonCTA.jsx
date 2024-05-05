import React from "react";
import { Input } from "@/components/ui/input";
import { useLocation } from "react-router-dom";

const CTA = ({ table, route }) => {
  const location = useLocation();
  const currentRoute = location.pathname;
  const isResidentsRoute = currentRoute === "/residents";
  const filterColumn = isResidentsRoute ? "fullName" : "username";

  return (
    <>
      <div className="flex justify-between items-start lg:items-center flex-col lg:flex-row gap-4">
        <div className="flex items-center py-4 gap-4">
          <Input
            placeholder={`Search By ${
              isResidentsRoute ? "Full Name" : "Username"
            }...`}
            value={table.getColumn(filterColumn)?.getFilterValue() ?? ""}
            onChange={(event) =>
              table.getColumn(filterColumn)?.setFilterValue(event.target.value)
            }
            className="max-w-md"
          />
        </div>
      </div>
    </>
  );
};

export default CTA;

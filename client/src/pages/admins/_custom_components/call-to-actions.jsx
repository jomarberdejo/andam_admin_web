import React from "react";
import { Input } from "@/components/ui/input";

const CTA = ({ table }) => {
  return (
    <>
      <div className="flex justify-between items-start lg:items-center flex-col lg:flex-row gap-4">
        <div className="flex items-center py-4 gap-4">
         
          <Input
            placeholder="Search By Username..."
            value={table.getColumn("username")?.getFilterValue() ?? ""}
            onChange={(event) =>
              table.getColumn("username")?.setFilterValue(event.target.value)
            }
            className="max-w-md"
          />

          
        </div>

        
      </div>
    </>
  );
};

export default CTA;

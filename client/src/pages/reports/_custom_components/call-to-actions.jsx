import React from "react";
import { Input } from "@/components/ui/input";
import { BiDownload } from "react-icons/bi";
import { Button } from "@/components/ui/button";
import { handleExportData } from "../_actions/handleExportAllCsv";
import { handleExportRows } from "../_actions/handleExportAllPdf";

const CTA = ({ table, data }) => {
  return (
    <>
      <div className="flex justify-between items-start lg:items-center flex-col lg:flex-row gap-4">
        <div className="flex items-center py-4 gap-4">
          {/* <Input
            placeholder="Filter By Report ID..."
            value={table.getColumn("id")?.getFilterValue() ?? ""}
            onChange={(event) =>
              table.getColumn("id")?.setFilterValue(event.target.value)
            }
            className="max-w-md"
          /> */}

          <Input
            placeholder="Filter By Resident's Name..."
            value={table.getColumn("name")?.getFilterValue() ?? ""}
            onChange={(event) =>
              table.getColumn("name")?.setFilterValue(event.target.value)
            }
            className="max-w-md"
          />

          <Input
            placeholder="Filter By Location..."
            value={table.getColumn("location")?.getFilterValue() ?? ""}
            onChange={(event) =>
              table.getColumn("location")?.setFilterValue(event.target.value)
            }
            className="max-w-md"
          />

          {/* <Input
            placeholder="Filter By Agency..."
            value={table.getColumn("agency")?.getFilterValue() ?? ""}
            onChange={(event) =>
              table.getColumn("agency")?.setFilterValue(event.target.value)
            }
            className="max-w-md"
          /> */}

          <Input
            placeholder="Filter By Date Reported..."
            value={table.getColumn("reportedAt")?.getFilterValue() ?? ""}
            onChange={(event) =>
              table.getColumn("reportedAt")?.setFilterValue(event.target.value)
            }
            className="max-w-md"
          />
        </div>

        <div className="flex items-center gap-4 flex-col sm:flex-row mb-4">
          <Button onClick={() => handleExportData(data)}>
            <BiDownload className="mr-2" />
            Export All Data (CSV)
          </Button>
          <Button
            disabled={table.getPaginationRowModel().rows.length === 0}
            //export all rows, including from the next page, (still respects filtering and sorting)
            onClick={() => handleExportRows(data)}
          >
            <BiDownload className="mr-2" />
            Export All Data (PDF)
          </Button>
        </div>
      </div>
    </>
  );
};

export default CTA;

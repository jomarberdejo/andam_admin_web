import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { DataTable } from "./_custom_components/data-table";
import { columns } from "./_custom_components/columns";

import { useGetUser } from "@/customhooks/useGetUser";

import { CheckCheck, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { handleMarkAsRead } from "./_actions/handleMarkAsRead";
import { fetchReports } from "@/common/fetchReports";

export default function Reports() {
  const { reportData } = fetchReports();
  const [pending, setIsPending] = useState(false);
  const { username } = useGetUser();
  const queryClient = useQueryClient();
  const { markAsRead: markRead } = handleMarkAsRead();

  const markAsRead = async () => {
    try {
      setIsPending(true);
      await markRead();
      queryClient.invalidateQueries(["reportdata"]);
    } catch (err) {
      console.log(err);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <>
      <div className="px-8 pt-6 container">
        <div className="flex justify-between items-center ">
          <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight mb-4">
            Welcome back {username},
          </h2>

          <Button
            className={`${pending ? "cursor-progress" : "cursor-pointer"}`}
            variant="outline"
            onClick={markAsRead}
          >
            {!pending ? (
              <CheckCheck className="mr-2 h-4 w-4" />
            ) : (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}{" "}
            Mark All as Read
          </Button>
        </div>
        <p className="text-md text-muted-foreground">
          Here's a list of all reports!
        </p>
      </div>

      <div className="container mx-auto py-4">
        {reportData && <DataTable columns={columns} data={reportData} />}
      </div>
    </>
  );
}

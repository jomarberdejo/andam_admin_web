import axios from "axios";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { fetchUserAdmins } from "@/common/fetchUsers";
import { DataTable } from "@/common/commonTable";
import { columns } from "./_custom_components/columns";
import { fetchAllResidents } from "@/common/fetchResidents";

export default function Admins() {
  const { data } = fetchAllResidents();
  return (
    <>
      <div className="px-8 pt-6 container">
        <p className="text-md text-muted-foreground">
          Here are the lists of all registered residents in the{" "}
          <span className="font-bold text-lg text-white">ANDAM</span> app for
          Carigara, Leyte!
        </p>
      </div>

      <div className="container mx-auto py-4">
        {data && <DataTable columns={columns} data={data} />}
      </div>
    </>
  );
}

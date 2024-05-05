import axios from "axios";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { columns } from "./_custom_components/columns";
import { formatDate } from "@/lib/dateFormat";
import AdminModal from "./_custom_components/admin-modal";
import { Plus } from "lucide-react";
import { fetchUserAdmins } from "@/common/fetchUsers";
import { DataTable } from "@/common/commonTable";

export default function Admins() {
  const { data } = fetchUserAdmins();
  return (
    <>
      <div className="px-8 pt-6 container">
        <div className="flex justify-between items-center">
          <p className="text-md text-muted-foreground">
            Here are the lists of all user administrator!
          </p>
          <AdminModal>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Add New Admin
            </Button>
          </AdminModal>
        </div>
      </div>

      <div className="container mx-auto py-4">
        {data && <DataTable columns={columns} data={data} />}
      </div>
    </>
  );
}

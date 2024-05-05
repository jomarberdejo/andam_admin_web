import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const columns = [
  // {
  //   accessorKey: "id",
  //   header: "Report ID",

  // },
  {
    accessorKey: "fullName",
    header: "Full Name",
  },

  {
    accessorKey: "contactNumber",
    header: "Phone",
  },
  {
    accessorKey: "registeredAt",
    header: "Date Registered",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const navigate = useNavigate();

      const report = row.original;

      const handleViewClick = (id) => {
        navigate(`/residents/${id}`);
      };

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>

            <DropdownMenuSeparator />

            <DropdownMenuItem onClick={() => handleViewClick(report.id)}>
              View Profile
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

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
    accessorKey: "Resident.imageIdentityUrl",
    header: "Reporter's Identity",
    cell: ({ row }) => (
      <Dialog>
        <DialogTrigger asChild>
          <img
            alt="image-identity"
            height={50}
            src={row?.original.Resident.imageIdentityUrl}
            loading="lazy"
            className="rounded-[50%] h-[60px] w-[60px] object-cover cursor-pointer"
          />
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Reporter's Identity</DialogTitle>
            <img
              alt="image-identity"
              height={50}
              width={50}
              src={row?.original.Resident.imageIdentityUrl}
              loading="lazy"
              className=" h-full w-full object-cover"
            />
          </DialogHeader>
        </DialogContent>
      </Dialog>
    ),
  },

  {
    accessorKey: "name",
    header: "Reporter's  Name",
  },
  {
    accessorKey: "detail",
    header: "Problem Detail",
  },
  {
    accessorKey: "location",
    header: "Location",
  },
  {
    accessorKey: "contact",
    header: "Phone",
  },
  {
    accessorKey: "reportedAt",
    header: "Reported At",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const navigate = useNavigate(); // Initialize navigate function

      const report = row.original;

      const handleViewClick = (id) => {
        navigate(`/reports/${id}`);
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
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(report.name)}
            >
              Copy Report's Name
            </DropdownMenuItem>
            <DropdownMenuSeparator />

            <DropdownMenuItem onClick={() => handleViewClick(report.id)}>
              View
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

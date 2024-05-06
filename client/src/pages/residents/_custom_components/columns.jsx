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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useGetUser } from "@/customhooks/useGetUser";

export const columns = [
  // {
  //   accessorKey: "id",
  //   header: "Report ID",

  // },

  {
    accessorKey: "imageIdentityUrl",
    header: "Resident's Identity",
    cell: ({ row }) => (
      <Dialog>
        <DialogTrigger asChild>
          <img
            alt="image-identity"
            height={50}
            src={row?.original.imageIdentityUrl}
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
              src={row?.original.imageIdentityUrl}
              loading="lazy"
              className=" h-full w-full object-cover"
            />
          </DialogHeader>
        </DialogContent>
      </Dialog>
    ),
  },

  {
    accessorKey: "fullName",
    header: "Full Name",
  },

  {
    accessorKey: "reports.length",
    header: "Total Reports Made",

    cell: ({ row }) => {
      const { agency } = useGetUser();
      const totalReports = row?.original.reports.filter(
        (report) => report.agency === agency
      );
      return (
        <span className="text-gray-500 font-medium text-xl">
          {totalReports.length}
        </span>
      );
    },
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

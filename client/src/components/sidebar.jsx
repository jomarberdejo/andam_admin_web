import { BiLogOut, BiX, BiMenu } from "react-icons/bi";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { TbUsersGroup } from "react-icons/tb";
import { AspectRatio } from "./ui/aspect-ratio";
import { useTheme } from "@/context/ThemeContextProvider";

import { FileStack, Map, Home, UserRoundPlus, UserCog } from "lucide-react";
import { Badge } from "./ui/badge";
import { GrUserAdmin } from "react-icons/gr";
import { useAuth } from "@/context/AuthContext";
import { fetchReports } from "@/common/fetchReports";
import { sidebarLogos } from "@/lib/sidebarLogo";
import { useGetUser } from "@/customhooks/useGetUser";

export default function Sidebar() {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const location = useLocation();
  const { logout } = useAuth();
  const { reportData } = fetchReports();
  const { agency } = useGetUser();

  const isActive = (path) => {
    return location.pathname.includes(path);
  };

  const filterNewReports = reportData?.filter((report) => report.isNew);

  const newReportsCount = filterNewReports?.length;

  const sidebarLogo = sidebarLogos.find(
    (agencyLogo) => agencyLogo.agency === agency
  );

  return (
    <Drawer direction="left">
      <DrawerTrigger asChild>
        <p>
          <BiMenu className="text-2xl cursor-pointer" />
        </p>
      </DrawerTrigger>
      <DrawerContent className="flex flex-col rounded-t-[1px] w-[360px] max-w-full h-full fixed bottom-0 left-0">
        <div className="flex flex-col h-full overflow-y-auto">
          <DrawerHeader>
            <div className="flex items-center justify-between p-4">
              <DrawerTitle>
                <p className="text-2xl font-bold">ANDAM</p>
              </DrawerTitle>
              <DrawerClose asChild>
                <Button variant="outline">
                  <BiX />
                </Button>
              </DrawerClose>
            </div>
          </DrawerHeader>

          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              <NavLink
                to="/dashboard"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 ${
                  isActive("/dashboard") ? "bg-muted" : ""
                } text-muted-foreground transition-all hover:text-primary`}
              >
                <Home className="h-4 w-4" />
                Dashboard
              </NavLink>
              <NavLink
                to="/reports"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 ${
                  isActive("/reports") ? "bg-muted" : ""
                } text-muted-foreground transition-all hover:text-primary`}
              >
                <FileStack className="h-4 w-4" />
                Reports
                {newReportsCount > 0 && (
                  <span className="absolute flex h-3 w-3 right-6 mb-6">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
                  </span>
                )}
                {newReportsCount > 0 && (
                  <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                    {newReportsCount}
                  </Badge>
                )}
              </NavLink>
              <NavLink
                to="/admins"
                className={`flex items-center gap-3 rounded-lg ${
                  isActive("/admins") ? "bg-muted" : ""
                } text-muted-foreground px-3 py-2 transition-all hover:text-primary`}
              >
                <GrUserAdmin className="h-4 w-4" />
                Agency Admins
              </NavLink>

              <NavLink
                to="/residents"
                className={`flex items-center gap-3 rounded-lg ${
                  isActive("/residents") ? "bg-muted" : ""
                } text-muted-foreground px-3 py-2 transition-all hover:text-primary`}
              >
                <TbUsersGroup className="h-4 w-4" />
                Residents
              </NavLink>

              <NavLink
                to="/maps"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 ${
                  isActive("/maps") ? "bg-muted" : ""
                } text-muted-foreground transition-all hover:text-primary`}
              >
                <Map className="h-4 w-4" />
                Maps
              </NavLink>
              <Separator className="my-4" />
              <NavLink
                to="/profile"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 ${
                  isActive("/profile") ? "bg-muted" : ""
                } text-muted-foreground transition-all hover:text-primary`}
              >
                <UserCog className="h-4 w-4" />
                Profile
              </NavLink>
            </nav>
          </div>
        </div>
        <AspectRatio ratio={16 / 9} className="py-4">
          <img
            src={sidebarLogo.logoUrl}
            alt="mdrrmo-logo"
            // className={`rounded-md object-cover max-w-full w-[180px] block mx-auto ${
            //   theme === "dark" ? "invert-[100%]" : ""
            // }`}
            className="rounded-sm object-cover w-[90%] h-full block mx-auto"
          />
        </AspectRatio>

        <DrawerFooter>
          <Button
            onClick={() => {
              logout();
              navigate("/");
            }}
          >
            <BiLogOut className="mr-2" /> Log Out
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

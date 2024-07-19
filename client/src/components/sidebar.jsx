import React from "react";
import { BiLogOut, BiX, BiMenu } from "react-icons/bi";
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
import { AspectRatio } from "./ui/aspect-ratio";
import { useTheme } from "@/context/ThemeContextProvider";
import { Badge } from "./ui/badge";
import { GrUserAdmin } from "react-icons/gr";
import { useAuth } from "@/context/AuthContext";
import { fetchReports } from "@/common/fetchReports";
import { sidebarLogos } from "@/lib/sidebarLogo";
import { useGetUser } from "@/customhooks/useGetUser";
import {
  FileStack,
  Map,
  Home,
  MessageCircle,
  UserCog,
  UserRoundPlus,
  Megaphone,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { TbUsersGroup } from "react-icons/tb";
import { Button } from "./ui/button";

const SidebarNavItem = ({ to, icon, text, isActive }) => {
  console.log(isActive);
  return (
    <DrawerClose asChild>
      <NavLink
        to={to}
        className={`flex items-center gap-3 rounded-lg px-3 py-2 ${
          isActive ? "bg-muted text-primary" : ""
        } text-muted-foreground transition-all hover:text-primary`}
      >
        {icon}
        {text}
      </NavLink>
    </DrawerClose>
  );
};

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
              <SidebarNavItem
                to="/dashboard"
                icon={<Home className="h-4 w-4" />}
                text="Dashboard"
                isActive={isActive("/dashboard")}
              />
              <SidebarNavItem
                to="/reports"
                icon={<FileStack className="h-4 w-4" />}
                text="Reports"
                isActive={isActive("/reports")}
              >
                {newReportsCount > 0 && (
                  <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                    {newReportsCount}
                  </Badge>
                )}
              </SidebarNavItem>
              <SidebarNavItem
                to="/announcement"
                icon={<Megaphone className="h-4 w-4" />}
                text="Announcement"
                isActive={isActive("/announcement")}
              />
              <SidebarNavItem
                to="/admins"
                icon={<GrUserAdmin className="h-4 w-4" />}
                text="Agency Admins"
                isActive={isActive("/admins")}
              />
              <SidebarNavItem
                to="/residents"
                icon={<TbUsersGroup className="h-4 w-4" />}
                text="Residents"
                isActive={isActive("/residents")}
              />
              <SidebarNavItem
                to="/maps"
                icon={<Map className="h-4 w-4" />}
                text="Maps"
                isActive={isActive("/maps")}
              />
              <Separator className="my-4" />
              <SidebarNavItem
                to="/feedback"
                icon={<MessageCircle className="h-4 w-4" />}
                text="Feedbacks"
                isActive={isActive("/feedback")}
              />
              <SidebarNavItem
                to="/profile"
                icon={<UserCog className="h-4 w-4" />}
                text="Profile"
                isActive={isActive("/profile")}
              />
            </nav>
          </div>
        </div>
        <AspectRatio ratio={16 / 9} className="py-4">
          <img
            src={sidebarLogo.logoUrl}
            alt="mdrrmo-logo"
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

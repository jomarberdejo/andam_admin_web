import { useNavigate } from "react-router-dom";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent } from "@/components/ui/tabs";

import { Trends } from "./_custom_components/trends";
import { RecentReports } from "./_custom_components/recent-reports";
import {
  Activity,
  File,
  UserCheck,
  FileText,
  ArrowUpRight,
} from "lucide-react";

import { TimeNow } from "./_custom_components/time-now";
import { Button } from "@/components/ui/button";
import { agencyIcons } from "./constants";
import { fetchReports } from "@/common/fetchReports";
import { fetchUserAdmins } from "@/common/fetchUsers";
import { useGetUser } from "@/customhooks/useGetUser";
import UserLoginAnalytics from "./_custom_components/user-login-analytics";
import { fetchAllResidents } from "@/common/fetchResidents";
import { GrUserAdmin } from "react-icons/gr";
import { TbUsersGroup } from "react-icons/tb";

export default function Dashboard() {
  const navigate = useNavigate();

  const { reportData } = fetchReports();
  const { data: adminData } = fetchUserAdmins();
  const { data: residentData } = fetchAllResidents();

  const agencyCounts = {};
  reportData?.forEach((report) => {
    const agency = report.agency;
    if (agencyCounts[agency]) {
      agencyCounts[agency]++;
    } else {
      agencyCounts[agency] = 1;
    }
  });

  // const agencyReports = Object.entries(agencyCounts);
  console.log(residentData);

  return (
    <>
      <div>
        <div className="flex items-center px-8 pt-6 ">
          <Activity className="w-6 h-6 mr-2" />
          <h2 className="text-3xl font-semibold">Overview</h2>
        </div>
        <div className="flex-1 space-y-4 p-2 sm:p-8 pt-6">
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4 items-center md:grid-cols-2 lg:grid-cols-4">
                <Card className="group cursor-pointer">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <File className="w-6 h-6 mr-2" />
                    <CardTitle className="text-2xl font-bold group-hover:text-4xl transition-all delay-150">
                      {reportData?.length}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-xl font-medium">Total Reports</div>
                  </CardContent>
                </Card>

                <Card className="group cursor-pointer">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <GrUserAdmin className="w-6 h-6 mr-2" />

                    <CardTitle className="text-2xl font-bold group-hover:text-4xl transition-all delay-150">
                      {adminData?.length}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-xl font-medium ">
                      Total Registered Admin
                    </div>
                  </CardContent>
                </Card>

                <Card className="group cursor-pointer">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <TbUsersGroup className="w-6 h-6 mr-2" />
                    <CardTitle className="text-2xl font-bold group-hover:text-4xl transition-all delay-150">
                      {residentData?.length}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-xl font-medium ">
                      Total Registered Residents
                    </div>
                  </CardContent>
                </Card>

                {/* {agencyReports.map(([agency, count]) => {
                  const Icon = agencyIcons[agency] || FileText;

                  return (
                    <Card key={agency}>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <Icon className="w-6 h-6 mr-2" />
                        <CardTitle className="text-3xl font-bold">
                          {count}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-xl font-medium"> {agency}</div>
                      </CardContent>
                    </Card>
                  );
                })} */}
              </div>
              <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-7 ">
                <Card className="col-span-1 sm:col-span-4">
                  <CardHeader>
                    <div className="flex justify-between ">
                      <CardTitle>Recent Reports</CardTitle>

                      <Button
                        variant="secondary"
                        onClick={() => navigate("/reports")}
                      >
                        <ArrowUpRight className="mr-2 h-4 w-4 " /> View All
                        <span className="relative flex h-3 w-3 mb-5 right-[-10px]">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
                        </span>
                      </Button>
                    </div>
                    <CardDescription>
                      Latest Reports are shown below.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <RecentReports />
                  </CardContent>
                </Card>

                <Card className="col-span-1 sm:col-span-3 hidden lg:block bg-gradient-to-r from-black/30 ">
                  <CardContent>
                    <TimeNow />
                  </CardContent>
                </Card>
              </div>

              <div className="grid gap-4 grid-cols-1">
                <Card className="col-span-1 sm:col-span-4">
                  <CardContent className="pl-2">
                    <Trends />
                  </CardContent>
                </Card>
              </div>

              <div className="grid gap-4 grid-cols-1">
                <Card className="col-span-1 sm:col-span-4">
                  <CardContent>
                    <UserLoginAnalytics />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}

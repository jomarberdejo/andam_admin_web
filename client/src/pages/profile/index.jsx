import { Outlet } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import SettingsLayout from "./layout/profile-layout";

export default function SettingsProfilePage() {
  return (
    <>
      <SettingsLayout>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium">Profile</h3>
            <p className="text-sm text-muted-foreground">
              Changing your profile information allows you to update the details
              visible on your site.
            </p>
          </div>
          <Separator />
          <Outlet />
        </div>
      </SettingsLayout>
    </>
  );
}

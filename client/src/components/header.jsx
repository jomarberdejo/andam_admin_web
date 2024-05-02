import Sidebar from "./sidebar";
import { UserNav } from "@/pages/dashboard/_custom_components/user-nav";

const Header = () => {
  return (
    <header className="border-b">
      <div className="flex h-16 items-center px-2">
        {/* <MainNav className="mx-6" /> */}
        <Sidebar />
        <div className="ml-auto flex items-center space-x-4">
          <UserNav />
        </div>
      </div>
    </header>
  );
};

export default Header;

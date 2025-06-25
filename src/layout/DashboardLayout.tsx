import { Button } from "@/components/ui/button";
import Sidebar from "@/features/Sidebar/Sidebar";
import { useAuthStore } from "@/store/useAuthStore";
import { useThemeStore } from "@/store/useThemeStore";
import { IoMoon, IoSunny } from "react-icons/io5";
import { Outlet } from "react-router-dom";
import { MdOutlineLogout } from "react-icons/md";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

const DashboardLayout = () => {
  const { theme, toggleTheme } = useThemeStore();
  const { logout } = useAuthStore();

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Desktop Sidebar */}
      <div className="hidden md:block w-64">
        <Sidebar />
      </div>

      {/* Mobile Sidebar */}
      <Sheet>
        <SheetTrigger asChild className="md:hidden">
          <Button variant="ghost" size="icon" className="absolute top-4 left-4 z-50">
            <Menu className="w-6 h-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 w-64">
          <Sidebar />
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-violet-500 dark:bg-primary-dark border-b p-4 flex justify-between items-center">
          <h1 className="text-white font-bold text-lg hidden md:block">Admin Panel</h1>
          <div className="flex items-center space-x-4 ml-auto">
            <Button variant="ghost" size="icon" onClick={toggleTheme}>
              {theme === "dark" ? <IoSunny className="h-5 w-5" /> : <IoMoon className="h-5 w-5" />}
            </Button>
            <div className="flex items-center gap-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <Button className="bg-pink-500" onClick={logout}>
                <MdOutlineLogout className="mr-1" />
                Logout
              </Button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;

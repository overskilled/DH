"use client";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "@/components/ui/button";
import { Menu, Bell, Settings, Globe, Sun, LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/useAuthStore";

export default function Navbar({
  setIsSidebarOpen,
}: {
  setIsSidebarOpen: (open: boolean) => void;
}) {
  const { user, accessToken, logout } = useAuthStore();

  const router = useRouter()

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <nav className="w-full bg-white border-b shadow-sm">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSidebarOpen(true)}
            className="md:hidden"
          >
            <Menu className="h-6 w-6" />
          </Button>

          <div className="flex-1">
            <h1 className="text-xl font-semibold text-gray-800">Dashboard</h1>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>

            <Button variant="ghost" size="icon">
              <Sun className="h-5 w-5" />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Globe className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <span className="mr-2">🇺🇸</span> English
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span className="mr-2">🇫🇷</span> Français
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-2">
                <div className="relative">
                  <Avatar className="h-10 w-10 ring-2">
                    <AvatarImage src={user?.profilePic || "/placeholder.svg"} alt={user?.firstName} />
                    <AvatarFallback
                      className="text-xs font-bold"
                    >
                      {user?.firstName
                        ?.split(" ")
                        .map((n: any) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar> 
                  <div
                    className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2"
                    style={{ backgroundColor: "#69eb48ff", borderColor: "var(--sidebar-background)" }}
                  />
                </div>
                <div className="hidden lg:block text-left">
                  <p className="text-sm font-medium">{`${user?.firstName} ${user?.lastName}`}</p>
                  <p className="text-xs text-gray-500">{user?.role}</p>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem className="text-red-600">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleLogout}
                    className={`w-full text-muted-foreground hover:text-foreground justify-start`}
                  >
                    <LogOut className="h-4 w-4" />
                    <span className="ml-2">Logout</span>
                  </Button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Settings className="h-6 w-6" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Bell className="mr-2 h-4 w-4" />
                  Notifications
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Sun className="mr-2 h-4 w-4" />
                  Theme
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Globe className="mr-2 h-4 w-4" />
                  Language
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem className="text-red-600">
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
}

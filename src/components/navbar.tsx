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
import { useRouter, useSearchParams } from "next/navigation";
import { useAuthStore } from "@/stores/useAuthStore";
import { useEffect, useState } from "react";
import { DepartmentService } from "@/services/departement.service";
import DepartmentNavigator from "./DepartmentNavigator";

export default function Navbar({
  setIsSidebarOpen,
}: {
  setIsSidebarOpen: (open: boolean) => void;
}) {
  const { user, accessToken, logout } = useAuthStore();

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [departement, setDepartement] = useState<any | null>(null);
  const searchParams = useSearchParams()

  // Fetch function with proper error handling
  const fetchDepartementInfo = async () => {
    // Check if user and departmentId exist
    if (!user?.departmentId) {
      setError("No department ID available");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await DepartmentService.getById(user.departmentId);
      console.log("Fetched department: ", response);
      setDepartement(response); // Fixed typo from 'reponse' to 'response'
    } catch (error: any) {
      console.error("Error fetching department:", error);
      setError(error.message || "Failed to fetch department information");
    } finally {
      setLoading(false);
    }
  };

  // Fetch on component mount and when user/departmentId changes
  useEffect(() => {
    if (user?.departmentId) {
      fetchDepartementInfo();
    }
  }, [user?.departmentId]);

  const router = useRouter()

  const handleLogout = () => {
    // Avoid triggering re-renders in the middle of hook calls
    logout(); // clear localStorage, Zustand state, etc.
    // Wait for re-render to settle
    setTimeout(() => router.push("/"), 0);
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

            {/* <Button variant="ghost" size="icon">
              <Sun className="h-5 w-5" />
            </Button> */}

            {departement ? (
              <DepartmentNavigator
                currentDepartment={searchParams.get('department') || user?.department?.name}
                onDepartmentChange={(dept) => {
                  router.push(`/dashboard?department=${encodeURIComponent(dept.name)}`)
                }}
              />
            ) : (
              <div>Loading departments...</div>
            )}

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

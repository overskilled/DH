"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import {
  LayoutDashboard,
  FolderOpen,
  Users,
  Scale,
  UserCircle,
  Search,
  FileText,
  Settings,
  ChevronRight,
  Building2,
  Briefcase,
  Gavel,
  DollarSign,
  Home,
  BarChart3,
  Bell,
  Lightbulb,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useMemo, useState } from "react"
import { useAuthStore } from "@/stores/useAuthStore"
import DepartmentNavigator from "./DepartmentNavigator"
import { motion, AnimatePresence } from "framer-motion" 

const DEPARTMENTS = {
  litigation: {
    name: "Litigation",
    color: "#152438",
    bgColor: "rgba(21, 36, 56, 0.08)",
    borderColor: "rgba(21, 36, 56, 0.15)",
    icon: Gavel,
  },
  corporate: {
    name: "Corporate Law",
    color: "#c2a349",
    bgColor: "rgba(194, 163, 73, 0.08)",
    borderColor: "rgba(194, 163, 73, 0.15)",
    icon: Building2,
  },
  intellectual: {
    name: "Intellectual Property",
    color: "#8b764c",
    bgColor: "rgba(139, 118, 76, 0.08)",
    borderColor: "rgba(139, 118, 76, 0.15)",
    icon: Lightbulb,
  },
  employment: {
    name: "Employment Law",
    color: "#cc9405",
    bgColor: "rgba(204, 148, 5, 0.08)",
    borderColor: "rgba(204, 148, 5, 0.15)",
    icon: Briefcase,
  },
  tax: {
    name: "Tax Law",
    color: "#3b4147",
    bgColor: "rgba(59, 65, 71, 0.08)",
    borderColor: "rgba(59, 65, 71, 0.15)",
    icon: DollarSign,
  },
  real_estate: {
    name: "Real Estate",
    color: "#36424c",
    bgColor: "rgba(54, 66, 76, 0.08)",
    borderColor: "rgba(54, 66, 76, 0.15)",
    icon: Home,
  },
  family: {
    name: "Family Law",
    color: "#c2a349",
    bgColor: "rgba(194, 163, 73, 0.08)",
    borderColor: "rgba(194, 163, 73, 0.15)",
    icon: Users,
  },
} as const

type DepartmentKey = keyof typeof DEPARTMENTS

const ROLE_PERMISSIONS = {
  ADMIN: [
    "dashboard",
    "dossiers",
    "lawyers",
    "staff",
    "billing",
    "reports",
    "analytics",
    "settings",
    "documents",
  ],
  BOARD: [
    "dashboard",
    "dossiers",
    "clients",
    "lawyers",
    "billing",
    "reports",
    "analytics",
    "settings",
    "documents",
  ],
  ASSOCIATE: ["dashboard", "dossiers", "clients", "billing", "documents", "settings"],
  SENIOR: ["dashboard", "dossiers", "clients", "documents", "settings"],
  MID: ["dashboard", "dossiers", "clients", "documents", "settings"],
  JUNIOR: ["dashboard", "dossiers", "clients", "documents"],
  admin: ["dashboard", "staff", "billing", "settings", "reports"],
  ACCOUNTANT: ["dashboard", "billing", "clients", "reports"],
} as const

type UserRole = keyof typeof ROLE_PERMISSIONS

// Skeleton Components
const SidebarSkeleton = () => (
  <div className="flex flex-col h-full bg-white">
    {/* Header Skeleton */}
    <div className="flex items-center justify-between px-5 py-4 border-b ">
      <Skeleton className="h-8 w-32" />
    </div>

    {/* Navigation Sections Skeleton */}
    <div className="flex-1 overflow-y-auto px-4 py-6 space-y-8">
      {[1, 2, 3].map((section) => (
        <div key={section} className="space-y-3">
          {/* Section Title Skeleton */}
          <Skeleton className="h-4 w-20" />
          
          {/* Menu Items Skeleton */}
          <div className="space-y-2">
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex items-center gap-3 px-2">
                <Skeleton className="h-5 w-5 rounded" />
                <Skeleton className="h-4 flex-1" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>

    {/* User Profile Skeleton */}
    <div className="border-t p-4">
      <div className="flex items-center gap-3">
        <Skeleton className="h-10 w-10 rounded-full" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-3 w-32" />
        </div>
      </div>
    </div>
  </div>
)

const NavigationItemSkeleton = () => (
  <div className="flex items-center gap-3 px-3 py-2.5">
    <Skeleton className="h-[18px] w-[18px] rounded" />
    <Skeleton className="h-4 flex-1" />
  </div>
)

export const Sidebar = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
}) => {
  const pathname = usePathname()
  const [expandedSections, setExpandedSections] = useState<string[]>(["main", "workspace"])
  const { user, accessToken, logout } = useAuthStore();

  const hexToRgba = useMemo(() => (hex: string, alpha: number) => {
    if (!hex) return `rgba(0, 0, 0, ${alpha})`;
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }, []);

  const currentUser = user;
  const userRole = (currentUser?.role as UserRole) || 'JUNIOR';
  const userDepartmentData = currentUser?.department;

  const allowedPages = useMemo(() => 
    ROLE_PERMISSIONS[userRole] || [], 
    [userRole]
  );

  const navigationSections = useMemo(() => {
    const allSections = [
      {
        id: "main",
        title: "Main",
        collapsible: false,
        items: [
          {
            href: "/dashboard",
            label: "Dashboard",
            icon: LayoutDashboard,
            permission: "dashboard",
            badge: null,
          },
        ],
      },
      {
        id: "workspace",
        title: "Workspace",
        collapsible: true,
        items: [
          {
            href: "/dashboard/documents",
            label: "Documents",
            icon: FolderOpen,
            permission: "dossiers",
          },
          {
            href: "/dashboard/cases",
            label: "Cases",
            icon: FolderOpen,
            permission: "cases",
          },
          {
            href: "/dashboard/clients",
            label: "Clients",
            icon: Users,
            permission: "clients",
            badge: null,
          },
        ],
      },
      {
        id: "team",
        title: "Team & Resources",
        collapsible: true,
        items: [
          {
            href: "/dashboard/lawyers",
            label: "Lawyers",
            icon: Scale,
            permission: "lawyers",
            badge: null,
          },
          {
            href: "/dashboard/staff",
            label: "Staff",
            icon: UserCircle,
            permission: "staff",
            badge: null,
          },
        ],
      },
      {
        id: "operations",
        title: "Operations",
        collapsible: true,
        items: [
          {
            href: "/dashboard/billing",
            label: "Billing",
            icon: DollarSign,
            permission: "billing",
            badge: null,
          },
          {
            href: "/dashboard/reports",
            label: "Reports",
            icon: BarChart3,
            permission: "reports",
            badge: null,
          },
          {
            href: "/dashboard/analytics",
            label: "Analytics",
            icon: BarChart3,
            permission: "analytics",
            badge: null,
          },
        ],
      },
    ]

    return allSections
      .map((section) => ({
        ...section,
        items: section.items.filter((item) => allowedPages.includes(item.permission as any)),
      }))
      .filter((section) => section.items.length > 0)
  }, [allowedPages])

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    )
  }

  const renderNavItem = (item: {
    href: string
    label: string
    icon: any
    badge?: number | null
  }) => {
    const Icon = item.icon
    const isActive = pathname === item.href
    const departmentColor = userDepartmentData?.colorHex || "#152438"

    return (
      <Link
        key={item.href}
        href={item.href}
        onClick={() => setIsOpen(false)}
        className={cn(
          "group relative flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 text-[13px] font-medium border border-transparent",
          "hover:scale-[1.02] hover:shadow-sm active:scale-100",
          isActive
            ? "text-white shadow-md"
            : "text-sidebar-muted hover:text-sidebar-foreground hover:bg-sidebar-accent"
        )}
        style={
          isActive
            ? {
                backgroundColor: departmentColor,
                borderLeft: `3px solid ${departmentColor}`,
                transform: "translateX(4px)",
              }
            : {
                borderLeft: "3px solid transparent",
              }
        }
      >
        <Icon 
          className={cn(
            "w-[18px] h-[18px] shrink-0 transition-transform duration-200",
            isActive ? "scale-110" : "group-hover:scale-105"
          )} 
        />
        
        <motion.span 
          className="flex-1 truncate"
          initial={false}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          {item.label}
        </motion.span>

        {item.badge && (
          <Badge
            variant="secondary"
            className={cn(
              "h-5 min-w-5 px-1.5 text-[11px] font-semibold tabular-nums transition-all duration-200",
              isActive 
                ? "bg-white text-sidebar-foreground" 
                : "bg-sidebar-accent text-sidebar-muted"
            )}
          >
            {item.badge}
          </Badge>
        )}

        {/* Hover effect line */}
        {!isActive && (
          <div 
            className="absolute inset-y-0 left-0 w-1 bg-transparent group-hover:bg-sidebar-border transition-colors duration-200 rounded-r"
          />
        )}
      </Link>
    )
  }

  const SidebarContent = () => {
    if (!user) {
      return <SidebarSkeleton />
    }

    return (
      <div className="flex flex-col h-full bg-white">
        {/* Header */}
        <div className="flex items-center justify-between px-3 py-0 border-b">
          <div className="flex items-center justify-center w-full">
            <Image 
              src="/Logo blue.png" 
              alt="Law Firm" 
              width={160} 
              height={35} 
              className="object-contain transition-opacity duration-200 hover:opacity-80"
              priority
            />
          </div>
        </div>

        {/* Department Info */}
        {userDepartmentData && (
          <motion.div 
            className="px-4 pt-5 pb-4"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div 
              className="flex items-center gap-3 px-3 py-2 rounded-lg border transition-all duration-200 hover:shadow-sm"
              style={{
                backgroundColor: hexToRgba(userDepartmentData.colorHex, 0.05),
                borderColor: hexToRgba(userDepartmentData.colorHex, 0.2),
              }}
            >
              <div 
                className="w-3 h-3 rounded-full flex-shrink-0"
                style={{ backgroundColor: userDepartmentData.colorHex }}
              />
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-semibold truncate text-black">
                  {userDepartmentData.name}
                </p>
                <p className="text-[11px] text-sidebar-muted truncate">
                  {currentUser?.position || "Team Member"}
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-4 py-2 space-y-6">
          {navigationSections.map((section, index) => (
            <motion.div 
              key={section.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              {section.collapsible ? (
                <motion.button
                  onClick={() => toggleSection(section.id)}
                  className="flex items-center justify-between w-full px-3 py-2 mb-2 text-[11px] font-bold uppercase tracking-wider transition-all duration-200 rounded-lg hover:bg-sidebar-accent group"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  style={{ color: "var(--sidebar-muted)" }}
                >
                  <span>{section.title}</span>
                  <motion.div
                    animate={{ rotate: expandedSections.includes(section.id) ? 90 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronRight className="w-3.5 h-3.5" />
                  </motion.div>
                </motion.button>
              ) : (
                <div
                  className="px-3 py-2 mb-2 text-[11px] font-bold uppercase tracking-wider transition-colors duration-200"
                  style={{ color: "var(--sidebar-muted)" }}
                >
                  {section.title}
                </div>
              )}

              <motion.div 
                className="space-y-1"
                initial={false}
                animate={{ 
                  height: expandedSections.includes(section.id) || !section.collapsible ? "auto" : 0,
                  opacity: expandedSections.includes(section.id) || !section.collapsible ? 1 : 0
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                {(!section.collapsible || expandedSections.includes(section.id)) && (
                  <div className="space-y-1">
                    {section.items.map((item, itemIndex) => (
                      <motion.div
                        key={item.href}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.2, delay: itemIndex * 0.05 }}
                      >
                        {renderNavItem(item)}
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>
            </motion.div>
          ))}

          {/* Tools Section */}
          {allowedPages.includes("settings" as any) && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.4 }}
            >
              <div
                className="px-3 py-2 mb-2 text-[11px] font-bold uppercase tracking-wider"
                style={{ color: "var(--sidebar-muted)" }}
              >
                Tools
              </div>
              <div className="space-y-1">
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Link
                    href="/dashboard/search"
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "group relative flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 text-[13px] font-medium border border-transparent",
                      "hover:scale-[1.02] hover:shadow-sm active:scale-100",
                      pathname === "/dashboard/search"
                        ? "text-white shadow-md"
                        : "text-sidebar-muted hover:text-sidebar-foreground hover:bg-sidebar-accent"
                    )}
                    style={
                      pathname === "/dashboard/search"
                        ? {
                            backgroundColor: userDepartmentData?.colorHex,
                            borderLeft: `3px solid ${userDepartmentData?.colorHex}`,
                            transform: "translateX(4px)",
                          }
                        : { borderLeft: "3px solid transparent" }
                    }
                  >
                    <Search className="w-[18px] h-[18px] transition-transform duration-200 group-hover:scale-105" />
                    <span>Search</span>
                    <kbd className="ml-auto text-[10px] px-2 py-1 rounded border font-semibold bg-sidebar-accent text-sidebar-muted">
                      ⌘K
                    </kbd>
                  </Link>
                </motion.div>

                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Link
                    href="/dashboard/settings"
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "group relative flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 text-[13px] font-medium border border-transparent",
                      "hover:scale-[1.02] hover:shadow-sm active:scale-100",
                      pathname === "/dashboard/settings"
                        ? "text-white shadow-md"
                        : "text-sidebar-muted hover:text-sidebar-foreground hover:bg-sidebar-accent"
                    )}
                    style={
                      pathname === "/dashboard/settings"
                        ? {
                            backgroundColor: userDepartmentData?.colorHex,
                            borderLeft: `3px solid ${userDepartmentData?.colorHex}`,
                            transform: "translateX(4px)",
                          }
                        : { borderLeft: "3px solid transparent" }
                    }
                  >
                    <Settings className="w-[18px] h-[18px] transition-transform duration-200 group-hover:scale-105" />
                    <span>Settings</span>
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          )}
        </nav>

        {/* User Profile */}
        <motion.div 
          className="border-t  p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.5 }}
        >
          <button className="flex items-center gap-3 w-full px-3 py-2.5 text-black hover:text-white rounded-lg transition-all duration-200 hover:bg-sidebar-accent group hover:shadow-sm">
            <div className="relative">
              <Avatar 
                className="h-10 w-10 transition-all duration-200 group-hover:scale-105"
                style={{ 
                  boxShadow: `0 0 0 2px ${userDepartmentData?.colorHex || '#152438'}`,
                }}
              >
                <AvatarImage src={currentUser?.profilePic || "/placeholder.svg"} alt={currentUser?.firstName} />
                <AvatarFallback
                  className="text-xs font-bold transition-colors duration-200"
                  style={{ 
                    backgroundColor: userDepartmentData?.colorHex || '#152438', 
                    color: "white" 
                  }}
                >
                  {currentUser?.firstName?.split(" ").map((n: any) => n[0]).join("")}
                </AvatarFallback>
              </Avatar>
              <div
                className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-sidebar transition-all duration-200 group-hover:scale-110"
                style={{ backgroundColor: "#7cf047" }}
              />
            </div>

            <div className="flex-1 min-w-0 text-left">
              <p className="text-[13px] font-semibold truncate  transition-colors duration-200">
                {`${currentUser?.firstName} ${currentUser?.lastName}`}
              </p>
              <p className="text-[11px] truncate font-medium  transition-colors duration-200">
                {currentUser?.email}
              </p>
            </div>
          </button>
        </motion.div>
      </div>
    )
  }

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col h-screen w-[280px] border-r  bg-sidebar overflow-hidden">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent 
          side="left" 
          className="w-[280px] p-0 border-r  bg-sidebar overflow-hidden"
        >
          <SidebarContent />
        </SheetContent>
      </Sheet>
    </>
  )
}
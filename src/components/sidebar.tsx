"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
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
import Loader from "./loader"

const DEPARTMENTS = {
  litigation: {
    name: "Litigation",
    color: "#152438", // Brand navy
    bgColor: "rgba(21, 36, 56, 0.08)",
    borderColor: "rgba(21, 36, 56, 0.15)",
    icon: Gavel,
  },
  corporate: {
    name: "Corporate Law",
    color: "#c2a349", // Brand gold
    bgColor: "rgba(194, 163, 73, 0.08)",
    borderColor: "rgba(194, 163, 73, 0.15)",
    icon: Building2,
  },
  intellectual: {
    name: "Intellectual Property",
    color: "#8b764c", // Brand bronze
    bgColor: "rgba(139, 118, 76, 0.08)",
    borderColor: "rgba(139, 118, 76, 0.15)",
    icon: Lightbulb,
  },
  employment: {
    name: "Employment Law",
    color: "#cc9405", // Brand orange
    bgColor: "rgba(204, 148, 5, 0.08)",
    borderColor: "rgba(204, 148, 5, 0.15)",
    icon: Briefcase,
  },
  tax: {
    name: "Tax Law",
    color: "#3b4147", // Brand charcoal
    bgColor: "rgba(59, 65, 71, 0.08)",
    borderColor: "rgba(59, 65, 71, 0.15)",
    icon: DollarSign,
  },
  real_estate: {
    name: "Real Estate",
    color: "#36424c", // Brand blue-gray
    bgColor: "rgba(54, 66, 76, 0.08)",
    borderColor: "rgba(54, 66, 76, 0.15)",
    icon: Home,
  },
  family: {
    name: "Family Law",
    color: "#c2a349", // Brand gold (reused for family)
    bgColor: "rgba(194, 163, 73, 0.08)",
    borderColor: "rgba(194, 163, 73, 0.15)",
    icon: Users,
  },
} as const

type DepartmentKey = keyof typeof DEPARTMENTS

const ROLE_PERMISSIONS = {
  ADMIN: [
    "dashboard",
    // "cases",
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
    // "cases",
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

  if (!user) {
    return (<Loader />)
  }

  const currentUser = user
  const userRole = (currentUser.role as UserRole)
  const userDepartment = (currentUser.department?.name)
  const userDepartmentData = (currentUser.department)

  const allowedPages = ROLE_PERMISSIONS[userRole] || []

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => (prev.includes(section) ? prev.filter((s) => s !== section) : [...prev, section]))
  }

  const hexToRgba = (hex: string, alpha: number) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

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
            href: "/dashboard/dossiers",
            label: "Dossiers",
            icon: FolderOpen,
            permission: "dossiers",
            // badge: currentUser.caseLoad || null,
          },
          {
            href: "/dashboard/cases",
            label: "Cases",
            icon: FolderOpen,
            permission: "cases",
            // badge: currentUser.caseLoad || null,
          },
          {
            href: "/dashboard/clients",
            label: "Clients",
            icon: Users,
            permission: "clients",
            badge: null,
          },
          {
            href: "/dashboard/documents",
            label: "Documents",
            icon: FileText,
            permission: "documents",
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

  const renderNavItem = (item: {
    href: string
    label: string
    icon: any
    badge?: number | null
  }) => {
    const Icon = item.icon
    const isActive = pathname === item.href

    return (
      <Link
        key={item.href}
        href={item.href}
        onClick={() => setIsOpen(false)}
        className={cn(
          "group relative flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 text-[13px] font-medium",
          isActive
            ? "text-foreground shadow-sm"
            : "text-[var(--sidebar-muted)] hover:text-foreground hover:bg-[var(--sidebar-accent-hover)]",
        )}
        style={
          isActive
            ? {
              backgroundColor: hexToRgba(userDepartmentData?.colorHex!, 0.5),
              color: "white",
              borderLeft: `3px solid ${userDepartmentData?.colorHex}`,
            }
            : undefined
        }
      >
        <Icon className="w-[18px] h-[18px] shrink-0" />
        <span className="flex-1 truncate">{item.label}</span>

        {item.badge && (
          <Badge
            variant="secondary"
            className="h-5 min-w-5 px-1.5 text-[11px] font-semibold tabular-nums"
            style={
              isActive
                ? {
                  backgroundColor: userDepartmentData?.colorHex,
                  color: "white",
                }
                : undefined
            }
          >
            {item.badge}
          </Badge>
        )}
      </Link>
    )
  }

  const SidebarContent = () => (
    <div className="flex flex-col h-full" style={{ backgroundColor: "var(--sidebar-background)" }}>
      <div
        className="flex items-center justify-between px-5 py-5 border-b"
      >
        <div className="flex items-center gap-3">
          <Image src="/Logo blue.png" alt="Law Firm" width={90} height={35} className="object-contain" />
          <div>
            <h1 className="text-[15px] font-bold tracking-tight" style={{ color: "#152438" }}>
              D. HAPPI
            </h1>
            <p className="text-[11px] font-medium" style={{ color: "#c2a349" }}>
              Avocats - lawyers
            </p>
          </div>
        </div>
      </div>

      <div className="px-4 pt-5 pb-4">
        <div
          className="flex items-center gap-3 px-5 py-3 rounded-lg border transition-all hover:shadow-sm cursor-pointer"
          style={{
            backgroundColor: userDepartmentData?.colorHex,
            borderColor: userDepartmentData?.colorHex,
          }}
        >
          {/* <div
            className="flex items-center justify-center w-9 h-9 rounded-lg shrink-0 shadow-sm text-white"
            style={{ backgroundColor: userDepartmentData?.colorHex }}
          >
            <userDepartmentData?.icon className="w-[18px] h-[18px] text-white" />
          </div> */}
          <div className="flex-1 min-w-0 text-white">
            <p className="text-[13px] font-bold truncate ">
              {userDepartmentData?.name} Departement
            </p>
            <p className="text-[11px] capitalize font-medium">
              {userRole.replace("_", " ")}
            </p>
          </div>
          <ChevronRight className="w-4 h-4 shrink-0" style={{ color: userDepartmentData?.colorHex }} />
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-4 py-2 space-y-6">
        {navigationSections.map((section) => (
          <div key={section.id}>
            {section.collapsible ? (
              <button
                onClick={() => toggleSection(section.id)}
                className="flex items-center justify-between w-full px-3 py-2 mb-2 text-[11px] font-bold uppercase tracking-wider transition-colors rounded-lg hover:bg-[var(--sidebar-accent)]"
                style={{ color: "var(--sidebar-muted)" }}
              >
                <span>{section.title}</span>
                <ChevronRight
                  className={cn(
                    "w-3.5 h-3.5 transition-transform duration-200",
                    expandedSections.includes(section.id) && "rotate-90",
                  )}
                />
              </button>
            ) : (
              <div
                className="px-3 py-2 mb-2 text-[11px] font-bold uppercase tracking-wider"
                style={{ color: "var(--sidebar-muted)" }}
              >
                {section.title}
              </div>
            )}

            {(!section.collapsible || expandedSections.includes(section.id)) && (
              <div className="space-y-1">{section.items.map(renderNavItem)}</div>
            )}
          </div>
        ))}

        {allowedPages.includes("settings" as any) && (
          <div>
            <div
              className="px-3 py-2 mb-2 text-[11px] font-bold uppercase tracking-wider"
              style={{ color: "var(--sidebar-muted)" }}
            >
              Tools
            </div>
            <div className="space-y-1">
              <Link
                href="/dashboard/search"
                onClick={() => setIsOpen(false)}
                className={cn(
                  "group relative flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 text-[13px] font-medium",
                  pathname === "/dashboard/search"
                    ? "text-foreground shadow-sm"
                    : "text-[var(--sidebar-muted)] hover:text-foreground hover:bg-[var(--sidebar-accent-hover)]",
                )}
                style={
                  pathname === "/dashboard/search"
                    ? {
                      backgroundColor: hexToRgba(userDepartmentData?.colorHex!, 0.5),
                      color: userDepartmentData?.colorHex,
                      borderLeft: `3px solid ${userDepartmentData?.colorHex}`,
                    }
                    : undefined
                }
              >
                <Search className="w-[18px] h-[18px]" />
                <span>Search</span>
                <kbd
                  className="ml-auto text-[10px] px-2 py-1 rounded border font-semibold"
                >
                  ⌘K
                </kbd>
              </Link>

              <Link
                href="/dashboard/settings"
                onClick={() => setIsOpen(false)}
                className={cn(
                  "group relative flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 text-[13px] font-medium",
                  pathname === "/dashboard/settings"
                    ? "text-foreground shadow-sm"
                    : "text-[var(--sidebar-muted)] hover:text-foreground hover:bg-[var(--sidebar-accent-hover)]",
                )}
                style={
                  pathname === "/dashboard/settings"
                    ? {
                      backgroundColor: hexToRgba(userDepartmentData?.colorHex!, 0.5),
                      color: userDepartmentData?.colorHex,
                      borderLeft: `3px solid ${userDepartmentData?.colorHex}`,
                    }
                    : undefined
                }
              >
                <Settings className="w-[18px] h-[18px]" />
                <span>Settings</span>
              </Link>
            </div>
          </div>
        )}
      </nav>

      <div className="border-t p-4">
        <button className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg transition-all hover:bg-[var(--sidebar-accent-hover)] group">
          <div className="relative">
            <Avatar className="h-10 w-10 ring-2" style={{ boxShadow: `0 0 0 2px ${userDepartmentData?.colorHex}` }}>
              <AvatarImage src={currentUser.profilePic || "/placeholder.svg"} alt={currentUser.firstName} />
              <AvatarFallback
                className="text-xs font-bold"
                style={{ backgroundColor: userDepartmentData?.colorHex, color: "white" }}
              >
                {currentUser.firstName
                  ?.split(" ")
                  .map((n: any) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div
              className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2"
              style={{ backgroundColor: "#7cf047ff", borderColor: "var(--sidebar-background)" }}
            />
          </div>

          <div className="flex-1 min-w-0 text-left">
            <p className="text-[13px] font-semibold truncate" style={{ color: "var(--sidebar-foreground)" }}>
              {`${currentUser.firstName} ${currentUser.lastName}`}
            </p>
            <p className="text-[11px] truncate font-medium" style={{ color: "var(--sidebar-muted)" }}>
              {currentUser.email}
            </p>
          </div>

          {/* <div className="flex items-center gap-1.5">
            {currentUser.notifications > 0 && (
              <div className="relative">
                <Bell className="w-[18px] h-[18px]" style={{ color: "var(--sidebar-muted)" }} />
                <div
                  className="absolute -top-1 -right-1 w-2 h-2 rounded-full ring-2"
                  style={{ backgroundColor: "#c2a349" }}
                />
              </div>
            )}
            <ChevronRight
              className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ color: "var(--sidebar-muted)" }}
            />
          </div> */}
        </button>
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className="hidden md:flex flex-col h-screen w-[280px] border-r"
      >
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent side="left" className="w-[280px] p-0">
          <SidebarContent />
        </SheetContent>
      </Sheet>
    </>
  )
}

"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

export const Sidebar = () => {
  const pathname = usePathname();

  const navLinks = [
    { href: "/dashboard", label: "Dashboard", icon: "dashboard" },
    { href: "/dashboard/cases", label: "Cases", icon: "folder" },
    { href: "/dashboard/clients", label: "Clients", icon: "groups" },
    { href: "/dashboard/lawyers", label: "Lawyers", icon: "person" },
    { href: "/dashboard/search", label: "Search", icon: "search" },
  ];

  return (
    <div className="fixed w-[280px] h-screen bg-gradient-to-b from-white to-gray-50 border-r border-gray-200 shadow-lg">
      <div className="flex items-center justify-between p-4 bg-white">
        <div className="flex items-center space-x-2">
          <span className="material-symbols-outlined text-blue-600">gavel</span>
          <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
            LawFirm CMS
          </h1>
        </div>
        <span className="material-symbols-outlined cursor-pointer hover:scale-110 transition-all duration-300 hover:text-blue-600">
          menu
        </span>
      </div>

      <nav className="mt-6 px-4">
        <ul className="space-y-2">
          {navLinks.map(({ href, label, icon }) => (
            <li key={href}>
              <Link
                href={href}
                className={`flex items-center p-3 rounded-lg transition-all duration-300 group ${
                  pathname === href
                    ? "bg-blue-50 text-blue-600"
                    : "hover:bg-gray-100"
                }`}
              >
                <span
                  className={`material-symbols-outlined mr-3 ${
                    pathname === href ? "text-blue-600" : ""
                  }`}
                >
                  {icon}
                </span>
                <span className="font-medium group-hover:translate-x-1 transition-transform">
                  {label}
                </span>
              </Link>
            </li>
          ))}

          {/* Communication Dropdown */}
          <li>
            <details className="group">
              <summary className="flex items-center p-4 rounded-lg hover:bg-gray-50/80 transition-all duration-300 cursor-pointer group">
                <span className="material-symbols-outlined text-blue-600 mr-3">
                  mail
                </span>
                <span className="font-semibold">Communication</span>
                <span className="material-symbols-outlined ml-auto group-open:rotate-180 transition-transform text-gray-500">
                  expand_more
                </span>
              </summary>
              <ul className="pl-12 mt-2 space-y-2">
                <li>
                  <Link
                    href="/email"
                    className="block py-2 hover:translate-x-1 transition-transform hover:text-blue-600"
                  >
                    Email
                  </Link>
                </li>
                <li>
                  <Link
                    href="/invoice"
                    className="block py-2 hover:translate-x-1 transition-transform hover:text-blue-600"
                  >
                    Invoice
                  </Link>
                </li>
              </ul>
            </details>
          </li>

          {/* Settings Dropdown */}
          <li>
            <details className="group">
              <summary className="flex items-center p-4 rounded-lg hover:bg-gray-50/80 transition-all duration-300 cursor-pointer group">
                <span className="material-symbols-outlined text-blue-600 mr-3">
                  settings
                </span>
                <span className="font-semibold">Settings</span>
                <span className="material-symbols-outlined ml-auto group-open:rotate-180 transition-transform text-gray-500">
                  expand_more
                </span>
              </summary>
              <ul className="pl-12 mt-2 space-y-2">
                <li>
                  <Link
                    href="/profile"
                    className="block py-2 hover:translate-x-1 transition-transform hover:text-blue-600"
                  >
                    Profile
                  </Link>
                </li>
                <li>
                  <Link
                    href="/security"
                    className="block py-2 hover:translate-x-1 transition-transform hover:text-blue-600"
                  >
                    Security
                  </Link>
                </li>
                <li>
                  <Link
                    href="/preferences"
                    className="block py-2 hover:translate-x-1 transition-transform hover:text-blue-600"
                  >
                    Preferences
                  </Link>
                </li>
              </ul>
            </details>
          </li>
        </ul>
      </nav>

      {/* User Info & Logout */}
      <div className="absolute bottom-0 w-full p-4 bg-white border-t border-gray-200">
        <div className="flex justify-between items-center space-x-3 group cursor-pointer">
          <div className="flex gap-5">
            <img
              src="https://api.dicebear.com/6.x/avataaars/svg?seed=John"
              alt="Profile"
              className="w-10 h-10 rounded-full ring-2 ring-blue-100 group-hover:ring-blue-200 transition-all duration-300"
            />
            <div className="group-hover:translate-x-1 transition-transform">
              <p className="font-medium">John Doe</p>
              <p className="text-sm text-gray-500">Senior Partner</p>
            </div>
          </div>
          <span className="material-symbols-outlined ml-auto text-gray-400 group-hover:text-blue-600 transition-colors">
            logout
          </span>
        </div>
      </div>
    </div>
  );
};

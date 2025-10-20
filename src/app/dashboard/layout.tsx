"use client";
import Navbar from "@/components/navbar";
import { Sidebar } from "@/components/sidebar";
import * as React from "react";
import { getACollection } from "@/functions/get-a-collection";
import { getADocument } from "@/functions/get-a-document";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  // Close sidebar on resize (for mobile to desktop transition)
  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="flex h-screen">
      {/* Sidebar - Hidden on mobile, shown on desktop */}
      <div className={`
              fixed lg:static inset-y-0 left-0 z-50
              transform transition-transform duration-300 ease-in-out
              ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            `}>
        <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      </div>

      {/* Overlay for mobile when sidebar is open */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main content area */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        <Navbar setIsSidebarOpen={setIsSidebarOpen} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto mx-auto w-full px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          {children}
        </main>
      </div>
    </div>
  );
}
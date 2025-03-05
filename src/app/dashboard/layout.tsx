import { Sidebar } from "@/components/sidebar";
import * as React from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full max-h-screen overflow-y-auto overflow-x-hidden">
        {children}
      </div>
    </div>
  );
}

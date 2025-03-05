import Navbar from "@/components/navbar";
import { Sidebar } from "@/components/sidebar";
import * as React from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="w-full max-h-screen overflow-y-auto overflow-x-hidden relative">
        <div className="sticky top-0 z-50">
          <Navbar />
        </div>
        <div className="overflow-y-auto max-h-screen">{children}</div>
      </div>
    </div>
  );
}

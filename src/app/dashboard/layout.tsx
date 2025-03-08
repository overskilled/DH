import Navbar from "@/components/navbar";
import { Sidebar } from "@/components/sidebar";
import * as React from "react";
import ProtectedRoute from "@/components/context/protected-route";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      <div className="flex h-screen">
        <Sidebar />
        <div className="w-full max-h-screen overflow-y-auto overflow-x-hidden relative">
          <div className="sticky top-0 z-50">
            <Navbar />
          </div>
          <div className="overflow-y-auto max-h-screen">{children}</div>
        </div>
      </div>
    </ProtectedRoute>
  );
}

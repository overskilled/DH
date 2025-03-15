"use client";
import Navbar from "@/components/navbar";
import { Sidebar } from "@/components/sidebar";
import * as React from "react";
import ProtectedRoute from "@/components/context/protected-route";
import { getACollection } from "@/functions/get-a-collection";
import { useAuth } from "@/components/context/auth-context";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, setLawyers, setClients } = useAuth();

  React.useEffect(() => {
    if (!user) {
      console.error("User is not authenticated");
      return;
    }

    const unsubscribe = getACollection("clients", setClients);

    // Cleanup listener on component unmount
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [user, setClients]);

  React.useEffect(() => {
    if (!user) {
      console.error("User is not authenticated");
      return;
    }

    const unsubscribe = getACollection("lawyers", setLawyers);

    // Cleanup listener on component unmount
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [user, setLawyers]);

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

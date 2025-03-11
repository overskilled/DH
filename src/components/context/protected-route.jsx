// components/ProtectedRoute.tsx
"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "./auth-context";
import Loader from '@/components/loader'

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading) {
    return <Loader />;
  }

  return user ? <>{children}</> : null;
};

export default ProtectedRoute;
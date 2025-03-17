"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/functions/firebase";
// import { IncomeType } from "@/lib/definitions";

const AuthContext = createContext<any>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState(null); // Initialize user infos
  const [lawyers, setLawyers] = useState<any>([]); // Initialize lawyers
  const [cases, setCases] = useState<any>([]); // Initialize cases
  const [clients, setClients] = useState<any>([]); // Initialize clients

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        userInfo,
        lawyers,
        cases,
        clients,
        setUserInfo,
        setLawyers,
        setCases,
        setClients,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

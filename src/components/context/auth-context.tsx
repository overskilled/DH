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

export const InitAuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState(null); // Initialize user infos
  const [lawyers, setLawyers] = useState<any>([]); // Initialize lawyers
  const [cases, setCases] = useState<any>([]); // Initialize cases
  const [clients, setClients] = useState<any>([]); // Initialize clients
  const [emails, setEmails] = useState<any>([]); // Initialize clients
  const [invoices, setInvoices] = useState<any>([]); // Initialize clients

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
        emails,
        invoices,
        setUserInfo,
        setLawyers,
        setCases,
        setClients,
        setEmails,
        setInvoices,
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

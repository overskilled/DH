import { User } from "@/lib/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";



interface AuthState {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;

  login: (user: User, token: string) => void;
  logout: () => void;
  setUser: (user: User | null) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      isAuthenticated: false,

      login: (user, token) =>
        set({
          user,
          accessToken: token,
          isAuthenticated: true,
        }),

      logout: () =>
        set({
          user: null,
          accessToken: null,
          isAuthenticated: false,
        }),

      setUser: (user) => set({ user }),
    }),
    {
      name: "auth-storage", // key in localStorage
    }
  )
);

/**
 * useAuthStore
 *
 * A Zustand store to store and handle
 * auth state globally
 */

import { create } from "zustand";

interface AuthState {
  user: string | null;
  role: string | null;
  checking: boolean;
  checkAuth: () => Promise<void>;
  setRole: (username: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  role: null,
  checking: true,

  checkAuth: async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/auth/check`,
        {
          method: "GET",
          credentials: "include",
        },
      );

      if (!res.ok) {
        set({ user: null, role: null, checking: false });
        return null;
      }

      const data = await res.json();
      const username = data.username;
      set({ user: username });
      return username;
    } catch (err) {
      console.error("Auth check failed:", err);
      set({ user: null, role: null, checking: false });
    }
  },

  setRole: async (username: string) => {
    try {
      const res = await fetch(
        import.meta.env.VITE_BACKEND_URL +
          `/api/v1/users/getUser?username=${username}`,
        {
          method: "GET",
          credentials: "include",
        },
      );

      if (!res.ok) {
        set({ role: null });
        return false;
      }

      const data = await res.json();
      const userInfo = data.result;
      const role = userInfo?.role;

      set({ role: role, checking: false });

      return role;
    } catch (err) {
      console.error("Role check failed:", err);
      set({ role: null, checking: false });
      return false;
    }
  },

  logout: async () => {
    try {
      await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
      localStorage.removeItem("user");
    } catch (err) {
      console.error("Logout failed:", err);
    } finally {
      set({ user: null, role: null });
    }
  },
}));

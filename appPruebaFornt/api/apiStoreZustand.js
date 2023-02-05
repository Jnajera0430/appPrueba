import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set) => ({
      token: "",
      setToken: (token) =>
        set((state) => ({
          token,
        })),
      profile: null,
      setProfile: (profile) =>
        set((state) => ({
          profile,
        })),
      logOut: (token, profile) =>
        set((state) => ({
          token,
          profile,
        })),
    }),
    {
      name: "auth",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

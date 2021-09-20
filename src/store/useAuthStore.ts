import create from "zustand";

interface AuthStore {
  token: string | null;

  setToken(token: string): void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  token: null,
  setToken: (token: string) => set(() => ({ token })),
}));

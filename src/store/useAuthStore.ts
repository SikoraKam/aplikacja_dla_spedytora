import create, { SetState } from "zustand";

interface AuthStore {
  token: string | null;
  setToken(token: string | null): void;
  reset(): void;
}

const getInitialState = (set: SetState<AuthStore>) => ({
  token: null,
  setToken: (token: string) => set(() => ({ token })),
});

export const useAuthStore = create<AuthStore>((set) => ({
  ...getInitialState(set),
  reset: () => set(() => getInitialState(set)),
}));

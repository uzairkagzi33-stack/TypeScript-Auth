import { create } from "zustand";

type AuthState = {
  username: string;
  email: string;
  recoveryEmail: string;
  setLoginIdentity: (_payload: { username: string; email: string }) => void;
  setRecoveryEmail: (_email: string) => void;
  clearRecoveryEmail: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  username: "",
  email: "",
  recoveryEmail: "",
  setLoginIdentity: ({ username, email }) => set({ username, email }),
  setRecoveryEmail: (recoveryEmail) => set({ recoveryEmail }),
  clearRecoveryEmail: () => set({ recoveryEmail: "" }),
}));

import React, { createContext, useContext, useState, ReactNode } from "react";

type AuthState = {
  username: string;
  email: string;
  recoveryEmail: string;
  setLoginIdentity: (payload: { username: string; email: string }) => void;
  setRecoveryEmail: (email: string) => void;
  clearRecoveryEmail: () => void;
  clearContext: () => void;
};

const AuthContext = createContext<AuthState | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [recoveryEmail, setRecoveryEmailState] = useState("");

  const setLoginIdentity = (payload: { username: string; email: string }) => {
    setUsername(payload.username);
    setEmail(payload.email);
  };

  const setRecoveryEmail = (email: string) => {
    setRecoveryEmailState(email);
  };

  const clearRecoveryEmail = () => {
    setRecoveryEmailState("");
  };

  const clearContext = () => {
    setUsername("");
    setEmail("");
    setRecoveryEmailState("");
  };

  const value = {
    username,
    email,
    recoveryEmail,
    setLoginIdentity,
    setRecoveryEmail,
    clearRecoveryEmail,
    clearContext,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useCredentials = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useCredentials must be used within an AuthProvider");
  }
  return context;
};

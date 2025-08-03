"use client";

import { createContext, useState, useMemo, ReactNode } from "react";

import { AuthService, User } from "@/services/AuthService";

type AuthContextType = {
  isLoggedIn: boolean;
  currentUser: User | null;
  login: (user: User) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const authService = useMemo(() => new AuthService(), []);

  const [currentUser, setCurrentUser] = useState<User | null>(
    authService.currentUser
  );

  const login = (user: User) => {
    authService.login(user, setCurrentUser);
  };

  const logout = () => {
    authService.logout(setCurrentUser);
  };

  const value = {
    isLoggedIn: currentUser !== null,
    currentUser,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

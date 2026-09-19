"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { DEMO_USERS, UserProfile } from "@/lib/db";

interface AuthContextProps {
  user: UserProfile | null;
  token: string | null;
  login: (email: string, role?: string) => Promise<boolean>;
  register: (name: string, email: string, role: UserProfile["role"], phone: string) => Promise<boolean>;
  logout: () => void;
  switchUser: (userId: string) => void;
  demoUsers: UserProfile[];
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(DEMO_USERS[0]); // default to Rajesh Kumar
  const [token, setToken] = useState<string | null>("mock-jwt-token-agritech-2026");

  useEffect(() => {
    const savedUserId = localStorage.getItem("agritech_active_user_id");
    if (savedUserId) {
      const found = DEMO_USERS.find((u) => u.id === savedUserId);
      if (found) {
        setUser(found);
      }
    }
  }, []);

  const login = async (email: string, role?: string): Promise<boolean> => {
    const existing = DEMO_USERS.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() || (role && u.role === role)
    );
    const selected = existing || {
      id: `user-${Date.now()}`,
      name: email.split("@")[0] || "Agri User",
      role: (role as UserProfile["role"]) || "farmer",
      email,
      phone: "+91 98765 43210",
      location: "Tamil Nadu, India",
      avatar: "👤",
    };

    setUser(selected);
    setToken(`jwt-token-${selected.id}`);
    localStorage.setItem("agritech_active_user_id", selected.id);
    return true;
  };

  const register = async (
    name: string,
    email: string,
    role: UserProfile["role"],
    phone: string
  ): Promise<boolean> => {
    const newUser: UserProfile = {
      id: `user-${Date.now()}`,
      name,
      email,
      role,
      phone,
      location: "Tamil Nadu, India",
      avatar: role === "farmer" ? "👨‍🌾" : role === "agronomist" ? "🔬" : "🏢",
    };

    DEMO_USERS.push(newUser);
    setUser(newUser);
    setToken(`jwt-token-${newUser.id}`);
    localStorage.setItem("agritech_active_user_id", newUser.id);
    return true;
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("agritech_active_user_id");
  };

  const switchUser = (userId: string) => {
    const found = DEMO_USERS.find((u) => u.id === userId);
    if (found) {
      setUser(found);
      setToken(`jwt-token-${found.id}`);
      localStorage.setItem("agritech_active_user_id", found.id);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        register,
        logout,
        switchUser,
        demoUsers: DEMO_USERS,
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

"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { User, UserRole } from "@/types/auth";

const AUTH_STORAGE_KEY = "grc-auth";

// Use sessionStorage so each tab has its own independent session
const getStorage = () => {
  if (typeof window === "undefined") return null;
  return window.sessionStorage;
};

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string, role: UserRole) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Demo users for testing
const demoUsers: Record<string, { password: string; user: User }> = {
  "client@company.com": {
    password: "demo123",
    user: {
      id: "user-001",
      email: "client@company.com",
      name: "Sarah Chen",
      role: "client",
      company: "TechCorp Inc.",
    },
  },
  "auditor@auditfirm.com": {
    password: "demo123",
    user: {
      id: "user-002",
      email: "auditor@auditfirm.com",
      name: "James Wilson",
      role: "auditor",
      company: "Wilson & Associates",
    },
  },
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session (using sessionStorage for tab isolation)
    const storage = getStorage();
    if (storage) {
      const stored = storage.getItem(AUTH_STORAGE_KEY);
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          setUser(parsed);
        } catch {
          storage.removeItem(AUTH_STORAGE_KEY);
        }
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string, role: UserRole): Promise<boolean> => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    const storage = getStorage();

    // Check demo users first
    const demoUser = demoUsers[email.toLowerCase()];
    if (demoUser && demoUser.password === password && demoUser.user.role === role) {
      setUser(demoUser.user);
      storage?.setItem(AUTH_STORAGE_KEY, JSON.stringify(demoUser.user));
      return true;
    }

    // For demo purposes, allow any email/password with selected role
    const newUser: User = {
      id: `user-${Date.now()}`,
      email: email.toLowerCase(),
      name: email.split("@")[0].replace(/[._]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
      role: role,
      company: role === "auditor" ? "Audit Firm" : "Company",
    };

    setUser(newUser);
    storage?.setItem(AUTH_STORAGE_KEY, JSON.stringify(newUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    const storage = getStorage();
    storage?.removeItem(AUTH_STORAGE_KEY);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

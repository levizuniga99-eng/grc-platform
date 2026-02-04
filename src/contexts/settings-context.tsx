"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface OrganizationSettings {
  organizationName: string;
  scopeName: string;
  auditName: string;
  industry: string;
  timezone: string;
  auditPeriodStart: string;
  auditPeriodEnd: string;
}

interface SettingsContextType {
  settings: OrganizationSettings;
  updateSettings: (newSettings: Partial<OrganizationSettings>) => void;
}

const STORAGE_KEY = "grc-settings";

const defaultSettings: OrganizationSettings = {
  organizationName: "Acme Corporation",
  scopeName: "CloudSync Platform",
  auditName: "SOC 2 Type II Audit 2024",
  industry: "technology",
  timezone: "pst",
  auditPeriodStart: "2025-01-01",
  auditPeriodEnd: "2025-12-31",
};

const SettingsContext = createContext<SettingsContextType | null>(null);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<OrganizationSettings>(defaultSettings);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load settings from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          setSettings({ ...defaultSettings, ...JSON.parse(saved) });
        }
      } catch {
        // Ignore errors
      }
      setIsLoaded(true);
    }
  }, []);

  // Save settings to localStorage when they change
  useEffect(() => {
    if (isLoaded && typeof window !== "undefined") {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
      } catch {
        // Ignore errors
      }
    }
  }, [settings, isLoaded]);

  const updateSettings = (newSettings: Partial<OrganizationSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSettings }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
}

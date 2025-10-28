"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { themes, defaultTheme, type Theme } from "@/config/themes";

interface ThemeContextType {
  theme: string;
  setTheme: (theme: string) => void;
  currentTheme: Theme;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<string>(defaultTheme);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("theme") || defaultTheme;
    setThemeState(savedTheme);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const currentTheme = themes[theme];
    const root = document.documentElement;

    root.style.setProperty("--color-background", currentTheme.colors.background);
    root.style.setProperty("--color-foreground", currentTheme.colors.foreground);
    root.style.setProperty("--color-border", currentTheme.colors.border);
    root.style.setProperty("--color-accent", currentTheme.colors.accent);
    root.style.setProperty("--color-muted", currentTheme.colors.muted);

    localStorage.setItem("theme", theme);
  }, [theme, mounted]);

  const setTheme = (newTheme: string) => {
    setThemeState(newTheme);
  };

  const currentTheme = themes[theme];

  return (
    <ThemeContext.Provider value={{ theme, setTheme, currentTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

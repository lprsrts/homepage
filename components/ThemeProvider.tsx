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
    // Validate that the saved theme exists, otherwise use default
    const validTheme = themes[savedTheme] ? savedTheme : defaultTheme;
    setThemeState(validTheme);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const currentTheme = themes[theme];
    if (!currentTheme) return;

    const root = document.documentElement;

    root.style.setProperty("--color-light-shade", currentTheme.colors.light_shade);
    root.style.setProperty("--color-light-accent", currentTheme.colors.light_accent);
    root.style.setProperty("--color-main", currentTheme.colors.main);
    root.style.setProperty("--color-dark-accent", currentTheme.colors.dark_accent);
    root.style.setProperty("--color-dark-shade", currentTheme.colors.dark_shade);

    localStorage.setItem("theme", theme);
  }, [theme, mounted]);

  const setTheme = (newTheme: string) => {
    // Validate theme exists before setting
    if (themes[newTheme]) {
      setThemeState(newTheme);
    }
  };

  const currentTheme = themes[theme] || themes[defaultTheme];

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

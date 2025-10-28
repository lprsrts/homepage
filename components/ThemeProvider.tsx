"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { themes, defaultTheme, getThemePalette, type Theme } from "@/config/themes";
import type { Palette } from "@/config/palette";

interface ThemeContextType {
  theme: string;
  setTheme: (theme: string) => void;
  currentTheme: Theme;
  currentPalette: Palette | undefined;
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

    const palette = getThemePalette(theme);
    if (!palette) return;

    const root = document.documentElement;

    // Set numbered shade and accent variables
    root.style.setProperty("--color-shade-1", palette.colors.shade_1);
    root.style.setProperty("--color-shade-2", palette.colors.shade_2);
    root.style.setProperty("--color-accent-1", palette.colors.accent_1);
    root.style.setProperty("--color-accent-2", palette.colors.accent_2);
    root.style.setProperty("--color-main", palette.colors.main);

    localStorage.setItem("theme", theme);
  }, [theme, mounted]);

  const setTheme = (newTheme: string) => {
    // Validate theme exists before setting
    if (themes[newTheme]) {
      setThemeState(newTheme);
    }
  };

  const currentTheme = themes[theme] || themes[defaultTheme];
  const currentPalette = getThemePalette(theme);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, currentTheme, currentPalette }}>
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

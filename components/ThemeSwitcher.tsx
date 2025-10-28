"use client";

import { useState, useRef, useEffect } from "react";
import { useTheme } from "./ThemeProvider";
import { themes } from "@/config/themes";

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleThemeChange = (themeKey: string) => {
    setTheme(themeKey);
    setIsOpen(false);
  };

  return (
    <div
      ref={dropdownRef}
      className="fixed bottom-6 right-6 z-50"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-4 py-2 text-sm border transition-colors"
        style={{
          backgroundColor: "var(--color-background)",
          color: "var(--color-foreground)",
          borderColor: "var(--color-border)",
        }}
        aria-label="Theme selector"
      >
        Theme
      </button>

      {isOpen && (
        <div
          className="absolute bottom-full right-0 mb-2 border min-w-[200px]"
          style={{
            backgroundColor: "var(--color-background)",
            borderColor: "var(--color-border)",
          }}
        >
          {Object.entries(themes).map(([key, themeData]) => (
            <button
              key={key}
              onClick={() => handleThemeChange(key)}
              className="w-full px-4 py-2 text-sm text-left transition-colors flex items-center justify-between"
              style={{
                backgroundColor: theme === key ? "var(--color-foreground)" : "var(--color-background)",
                color: theme === key ? "var(--color-background)" : "var(--color-foreground)",
              }}
            >
              <span>{themeData.name}</span>
              {theme === key && <span>✓</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

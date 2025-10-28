export interface Theme {
  name: string;
  colors: {
    light_shade: string;
    light_accent: string;
    main: string;
    dark_accent: string;
    dark_shade: string;
  };
}

export const themes: Record<string, Theme> = {
  default_light: {
    name: "Default Light",
    colors: {
      light_shade: "#ffffff",
      light_accent: "#f5f5f5",
      main: "#000000",
      dark_accent: "#333333",
      dark_shade: "#6b7280",
    },
  },
  default_dark: {
    name: "Default Dark",
    colors: {
      light_shade: "#000000",
      light_accent: "#1a1a1a",
      main: "#ffffff",
      dark_accent: "#cccccc",
      dark_shade: "#9ca3af",
    },
  },
  sepia: {
    name: "Sepia",
    colors: {
      light_shade: "#f4f1ea",
      light_accent: "#e8e3d6",
      main: "#5c4a3a",
      dark_accent: "#8b6f47",
      dark_shade: "#9b8b7e",
    },
  },
  forest: {
    name: "Forest",
    colors: {
      light_shade: "#f0f4f0",
      light_accent: "#e1ebe1",
      main: "#1a3a1a",
      dark_accent: "#2d5a2d",
      dark_shade: "#6b8e6b",
    },
  },
  ocean: {
    name: "Ocean",
    colors: {
      light_shade: "#f0f4f8",
      light_accent: "#e1ebf4",
      main: "#0f2a3a",
      dark_accent: "#1e3a5f",
      dark_shade: "#5a8bb0",
    },
  },
  sunset: {
    name: "Sunset",
    colors: {
      light_shade: "#fff5f0",
      light_accent: "#ffe8db",
      main: "#3a1f1f",
      dark_accent: "#8b4513",
      dark_shade: "#cd853f",
    },
  },
  midnight: {
    name: "Midnight",
    colors: {
      light_shade: "#0f0f23",
      light_accent: "#1a1a3d",
      main: "#e0e0ff",
      dark_accent: "#6666cc",
      dark_shade: "#9999cc",
    },
  },
  minimal: {
    name: "Minimal Gray",
    colors: {
      light_shade: "#fafafa",
      light_accent: "#f0f0f0",
      main: "#1a1a1a",
      dark_accent: "#404040",
      dark_shade: "#737373",
    },
  },
};

export const defaultTheme = "default_light";

// Semantic color constants
export const semanticColors = {
  primary: "var(--color-main)",
  info: "var(--color-dark-accent)",
  success: "#22c55e",
  warning: "#f59e0b",
  danger: "#ef4444",
} as const;

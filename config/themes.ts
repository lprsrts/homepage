export interface Theme {
  name: string;
  colors: {
    background: string;
    foreground: string;
    border: string;
    accent: string;
    muted: string;
  };
}

export const themes: Record<string, Theme> = {
  default: {
    name: "Default (Black & White)",
    colors: {
      background: "#ffffff",
      foreground: "#000000",
      border: "#000000",
      accent: "#000000",
      muted: "#6b7280",
    },
  },
  dark: {
    name: "Dark",
    colors: {
      background: "#000000",
      foreground: "#ffffff",
      border: "#ffffff",
      accent: "#ffffff",
      muted: "#9ca3af",
    },
  },
  sepia: {
    name: "Sepia",
    colors: {
      background: "#f4f1ea",
      foreground: "#5c4a3a",
      border: "#5c4a3a",
      accent: "#8b6f47",
      muted: "#9b8b7e",
    },
  },
  forest: {
    name: "Forest",
    colors: {
      background: "#f0f4f0",
      foreground: "#1a3a1a",
      border: "#2d5a2d",
      accent: "#3d7a3d",
      muted: "#6b8e6b",
    },
  },
  ocean: {
    name: "Ocean",
    colors: {
      background: "#f0f4f8",
      foreground: "#0f2a3a",
      border: "#1e3a5f",
      accent: "#2c5f8d",
      muted: "#5a8bb0",
    },
  },
  sunset: {
    name: "Sunset",
    colors: {
      background: "#fff5f0",
      foreground: "#3a1f1f",
      border: "#8b4513",
      accent: "#d2691e",
      muted: "#cd853f",
    },
  },
  midnight: {
    name: "Midnight",
    colors: {
      background: "#0f0f23",
      foreground: "#e0e0ff",
      border: "#6666cc",
      accent: "#8888ff",
      muted: "#9999cc",
    },
  },
  minimal: {
    name: "Minimal Gray",
    colors: {
      background: "#fafafa",
      foreground: "#1a1a1a",
      border: "#333333",
      accent: "#404040",
      muted: "#737373",
    },
  },
};

export const defaultTheme = "default";

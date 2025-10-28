import { palettes, type Palette } from "./palette";

export interface Theme {
  name: string;
  palette: string;
}

export const themes: Record<string, Theme> = {
  default_light: {
    name: "Default Light",
    palette: "monochrome_light",
  },
  default_dark: {
    name: "Default Dark",
    palette: "monochrome_dark",
  },
  sepia: {
    name: "Sepia",
    palette: "sepia",
  },
  forest: {
    name: "Forest",
    palette: "forest",
  },
  ocean: {
    name: "Ocean",
    palette: "ocean",
  },
  sunset: {
    name: "Sunset",
    palette: "sunset",
  },
  midnight: {
    name: "Midnight",
    palette: "midnight",
  },
  minimal: {
    name: "Minimal Gray",
    palette: "minimal_gray",
  },
};

export const defaultTheme = "default_light";

// Helper function to get palette colors for a theme
export function getThemePalette(themeKey: string): Palette | undefined {
  const theme = themes[themeKey];
  if (!theme) return undefined;
  return palettes[theme.palette];
}

// Semantic color constants
export const semanticColors = {
  primary: "var(--color-main)",
  info: "var(--color-accent-2)",
  success: "#22c55e",
  warning: "#f59e0b",
  danger: "#ef4444",
} as const;

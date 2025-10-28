import { palettes, type Palette } from "./palette";

export interface Theme {
  name: string;
  palette: string;
}

export const themes: Record<string, Theme> = {
  default_light: {
    name: "Toupe Light",
    palette: "toupe_light",
  },
  default_dark: {
    name: "Toupe Dark",
    palette: "toupe_dark",
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
  primary: "#4c4239",
  info: "#171418",
  success: "#4c8e49",
  warning: "#c97e11",
  danger: "#f44336",
} as const;
